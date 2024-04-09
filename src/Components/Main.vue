<template>
    <main>
        <div class="movies">
            <button class="a-movie" :class="{ 'selectedMovie': movie._id === selectedMovieID }" v-for="movie in movies" :key="movie._id" @click="selectMovie(movie)">
                {{ movie.name }}
            </button>
        </div>
        <h2>Guess which character this quote belongs to?</h2>
        <h3>"{{ randomQuote }}"</h3>
        <div class="characters-box">
            <div class="character" 
                 :class="{ 'correct-guess': guessResult === true, 'incorrect-guess': guessResult === false}" 
                 v-for="character in allAnswers" 
                 :key="character._id" 
                 @click="checkCharacter(character)">
                {{ character.name }}
            </div>
        </div>
        <div v-if="guessResult === true">
            <p>Well done !</p>
        </div>
        <div v-if="guessResult === false">
            <p>Try again...</p>
        </div>
        <div class="score">
            <p>Score: {{ score }}</p>
        </div>
    </main>
</template>

<script>
    export default {
        name: "Main",
        props: {
            randomQuote: String,
            goodAnswer: Object,
            allAnswers: Array,
            movies: Array,
            selectMovie: Function,
            selectedMovieID : String,
            setCookie: Function,
            getCookie: Function
        },
        data() {
            return {
                guessResult: null,
                score: 0,
            };
        },
        created() {
            const savedScore = this.getCookie("score");
            if (savedScore !== null) {
                this.score = parseInt(savedScore);
            }
        },
        methods: {
            checkCharacter(character) {
                if (character._id === this.goodAnswer._id) {
                    this.score++;
                    this.setCookie("score", this.score, 365);
                    this.guessResult = true;
                } else {
                    this.guessResult = false;
                }
                setTimeout(() => {
                    window.location.reload();
                },  750);
            },
            
        }
    }
</script>

<style>

h2{
    color : #132F2A;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

h3{
    color:#BFB2B2;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.movies{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
} 

.a-movie{
    background-color: #295647;
    color: #BFB2B2;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
    border: none;
}

.selectedMovie {
    background-color: #BFB2B2;
    color: #295647;
}

.characters-box {
    display: grid;
    place-items: center;
}

.character {
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #295647;
    color: #BFB2B2;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}
    
.correct-guess {
    background-color: #8FDB8F;
    color : black;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.incorrect-guess {
    background-color: rgb(255, 85, 85);
    color : black;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

.score{
    position: absolute;
    color: #132F2A;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

@media only screen and (max-width: 600px) {
  /* Styles pour les téléphones */
    h2{
        font-size: 22px;
    }

    h3{
        font-size: 28px;
    }

    .movies{
        row-gap: 15px;
        margin-bottom: 20px
    }

    .a-movie{
        font-size: 20px;
        border-radius: 15px;
        padding: 12px;
    }

    .characters-box {
        margin : 10px 2vw 10px 2vw;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 30px;
    }

    .character {
        width: 50vw;
        height: 50vw;
        font-size: 22px;
    }

    .score{
        top: 20px;
        left : 5vw;
        font-size: 25px;
    }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
  /* Styles pour les tablettes */
    h2{
        font-size: 28px;
    }

    h3{
        font-size: 32px;
    }

    .movies{
        column-gap: 30px;
        margin-bottom: 20px
    }

    .a-movie{
        font-size: 22px;
        border-radius: 15px;
        padding: 15px;
    }

    .characters-box {
        margin : 10px 2vw 10px 2vw;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
    }

    .character {
        width: 25vw;
        height: 25vw;
        font-size: 28px;
    }

    .score{
        top: 20px;
        left : 5vw;
        font-size: 30px;
    }
}

@media only screen and (min-width: 1025px) {
  /* Styles pour les ordinateurs */
    h2{
        font-size: 32px;
    }

    h3{
        font-size: 36px;
    }

    .movies{
        column-gap: 50px;
        margin-bottom: 25px
    }

    .a-movie{
        font-size: 24px;
        border-radius: 15px;
        padding: 10px;
    }

    .characters-box {
        margin : 10px 20vw 10px 20vw;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;
    }

    .character {
        width: 12vw;
        height: 12vw;
        font-size: 32px;
    }

    .score{
        top: 0px;
        left : 10vw;
        font-size: 40px;
    }
}

</style>