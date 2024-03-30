<template>
    <main>
        <div>
            <button v-for="movie in movies" :key="movie._id" @click="selectMovie(movie)">
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
            <p>Well done !</p>>
        </div>
        <div v-if="guessResult === false">
            <p>Try again...</p>>
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
            selectMovie: Function
        },
        data() {
            return {
                guessResult: null,
                guessResultMessage: '',
            };
        },
        methods: {
            checkCharacter(character) {
                if (character._id === this.goodAnswer._id) {
                    this.guessResult = true;
                    setTimeout(() => {
                        window.location.reload(); // Recharger la page après quelques secondes
                    }, 500);
                } else {
                    // Si l'utilisateur clique sur une autre div (réponse incorrecte), recharger la page après quelques secondes
                    this.guessResult = false;
                    setTimeout(() => {
                        window.location.reload(); // Recharger la page après quelques secondes
                    }, 500);
                }
            },
        }
    }
</script>

<style>
h2{
    color : #132F2A;
    font-size: 32px;
 }

 h3{
    color:#BFB2B2;
    font-size: 36px;
 }

 .characters-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Crée deux colonnes de largeur égale */
  grid-gap: 30px; /* Espacement entre les éléments */
  text-align: center;
}

.character {
    background-color: #295647;
    color: #BFB2B2;
    font-size: 32px;
    width: 13vw;
    height: 13vw;
}

.correct-guess {
    background-color: #8FDB8F; /* Vert clair */
    color : black;
}

.incorrect-guess {
    background-color: #C0C0C0; /* Gris */
    color : black;
}

</style>