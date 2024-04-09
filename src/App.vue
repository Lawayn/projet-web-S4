<template>
  <div>
    <Header/>
    <Main :randomQuote="randomQuote" :goodAnswer="goodAnswer" :allAnswers="allAnswers" :movies="movies" :selectedMovieID="selectedMovieID" :selectMovie="selectMovie" :setCookie="setCookie" :getCookie="getCookie"/>
    <Footer/>
  </div>
</template>

<script>
import '@fontsource/bilbo'
import Header from './Components/Header.vue';
import Footer from './Components/Footer.vue';
import Main from './Components/Main.vue';
import { selectQuotes, selectOneCharacter, selectRandomCharacters, selectMovies } from './Services/services';

export default {
  data() {
    return {
      quotes: [],
      randomQuote: null,
      wrongAnswers: null,
      goodAnswer: null,
      allAnswers: null,
      characterName: null,
      movies: [],
      selectedMovie: null,
      selectedMovieID: null
    };
  },
  async created() {  
    this.selectedMovieID = this.getCookie('selectedMovieId');
    selectRandomCharacters(3).then(randomCharacters => {
      this.wrongAnswers = randomCharacters;
    });
    await this.showQuotes();
    await this.showMovies();
    
    if (this.selectedMovieID) {
      const selectedMovie = this.movies.find(movie => movie._id === this.selectedMovieID);
      if (selectedMovie) {
        this.selectedMovie = selectedMovie;
        this.filterQuotesByMovie();
      }
    } else {
      this.selectedMovie = this.movies[0];
      this.filterQuotesByMovie();
    }
  },
  computed: {
    shuffledCharacters() {
      const shuffled = [...this.wrongAnswers];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
  },
  methods: {
    async showMovies() {
      this.movies = await selectMovies();

      this.movies = this.movies.filter(movie => {
        return this.quotes.some(quote => quote.movie === movie._id);
      });
      if (this.selectedMovieID) {
        const selectedMovie = this.movies.find(movie => movie._id === this.selectedMovieID);
        if (selectedMovie) {
          this.selectedMovie = selectedMovie;
        }
      }
    },
    async showQuotes() {
      this.quotes = await selectQuotes();
      this.filterQuotesByMovie();
    },
    async filterQuotesByMovie() {
      if (!this.selectedMovieID) {
        this.randomQuote = "Please select a movie.";
        return;
      }

      const filteredQuotes = this.quotes.filter(quote => quote.movie === this.selectedMovieID);
      if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        this.randomQuote = filteredQuotes[randomIndex].dialog;
        const characterID = filteredQuotes[randomIndex].character;
        if (characterID) {
          this.goodAnswer = await selectOneCharacter(characterID);
          if (this.goodAnswer) {
            this.allAnswers = [...this.wrongAnswers, this.goodAnswer];
            this.allAnswers = this.shuffleArray(this.allAnswers);
          }
        }
      } else {
        this.randomQuote = "No quotes found for this film.";
      }
    },
    async showOneCharacter(characterID) {
      const character = await selectOneCharacter(characterID);
      if (character) {
        this.characterName = character.name;
      } else {
        console.log("No characters found with the specified ID  :", characterID);
      }
    },
    selectMovie(movie) {
      this.selectedMovie = movie;
      this.selectedMovieID = movie._id;
      this.filterQuotesByMovie();
      this.setCookie("selectedMovieId", movie._id, 365);
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },
    getCookie(name) {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) === ' ') {
              cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) === 0) {
              return cookie.substring(name.length + 1, cookie.length);
          }
      }
      return null;
    }
  },
  components : {
    Header,
    Footer,
    Main
  }
};
</script>

<style>

body{
  background-color: #486753;
}

p {
  text-align: center;
}

#app {
  display : block;
  max-width: 100vw;
  width: 100%;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  #app{
    margin-top: 5vw;
    margin-bottom: 5vw;
  }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
  #app{
    margin-top: 3vw;
    margin-bottom: 3vw;
  }
}

@media only screen and (min-width: 1025px) {
  #app{
    margin-top: 2vw;
    margin-bottom: 2vw;
  }
  
}

</style>