<template>
  <div>
    <Header/>
    <Main :randomQuote="randomQuote" :goodAnswer="goodAnswer" :allAnswers="allAnswers" :movies="movies" :selectedMovie="selectedMovie" :selectMovie="selectMovie"/>
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
      character: [],
      characterID: null,
      characterName: null,
      randomCharacters: [],
      movies: [],
      movieName: null,
      selectedMovie: null // Nouvelle propriété pour stocker le film sélectionné
    };
  },
  async created() {
    //const wrongAnswers = await getWrongAnswer()
    //const questionContent = await getQuestion()
    //this.question = questionContent.question
    //this.goodAnswer = questionContent.answer
    //let allAnswers = [...wrongAnswer, goodAnswer]
    //this.allAnswers = shuffle(allAnswers)

    // if (selectedAnswer == this.goodAnswer)
    // else 

    
    selectRandomCharacters(3).then(randomCharacters => {
      this.wrongAnswers = randomCharacters;
    });
    await this.showQuotes();
    this.showMovies();
    
  },
  computed: {
      shuffledCharacters() {
          // Créer une copie des personnages aléatoire
          const shuffled = [...this.randomCharacters];
          // Utiliser l'algorithme de Fisher-Yates pour mélanger les personnages
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

      // Filtrer les films pour lesquels des citations existent
      this.movies = this.movies.filter(movie => {
        return this.quotes.some(quote => quote.movie === movie._id);
      });
    },
    async showQuotes() {
      this.quotes = await selectQuotes();
      this.filterQuotesByMovie();
    },
    async filterQuotesByMovie() {
      if (this.selectedMovie) {
          // Filtrer les citations pour le film sélectionné
          const filteredQuotes = this.quotes.filter(quote => quote.movie === this.selectedMovie._id);
          if (filteredQuotes.length > 0) {
              // Sélectionner une citation aléatoire parmi les citations filtrées
              const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
              this.randomQuote = filteredQuotes[randomIndex].dialog;
              const characterID = filteredQuotes[randomIndex].character;
              if (characterID) {
                  // Attendre que la promesse soit résolue pour obtenir les données du personnage
                  this.goodAnswer = await selectOneCharacter(characterID);
                  if (this.goodAnswer) {
                      this.allAnswers = [...this.wrongAnswers, this.goodAnswer];
                      this.allAnswers = this.shuffleArray(this.allAnswers);
                  }
              }
          } else {
              // Aucune citation trouvée pour le film sélectionné
              this.randomQuote = "Aucune citation trouvée pour ce film.";
              this.characterName = null;
          }
      } else {
          // Aucun film sélectionné, afficher un message par défaut
          this.randomQuote = "Please select a movie.";
          this.characterName = null;
      }
    },
    async showOneCharacter(characterID) {
      const character = await selectOneCharacter(characterID);
      if (character) {
        this.characterName = character.name;
      } else {
        console.log("Aucun personnage trouvé avec l'ID spécifié :", characterID);
      }
    },
    selectMovie(movie) {
      // Mettre à jour le film sélectionné et filtrer les citations
      this.selectedMovie = movie;
      this.filterQuotesByMovie();
    },
    shuffleArray(array) {
      // Implémentation de l'algorithme de Fisher-Yates pour mélanger un tableau
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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

  #app{
    position: fixed;
    top : 0;
    left: 50%;
    width: 100%;
    height: 100%;
    text-align: center;
    transform: translateX(-50%);
    display: block;
    display: block;
    margin-top: 2vw;
    margin-bottom: 2vw;
  }

  p {
    text-align: center; 
    font-size: 50px;
  }
</style>