<template>
    <header>
        <h1>The One Quiz</h1>
    </header>
</template>

<script>
    export default {
      name: "Header"  
    }
</script>

<style>

h1 {
    color: #BFB2B2;
    font-family: 'Bilbo', cursive;
}

@media only screen and (max-width: 600px) {
    header{
        margin-top: 20px;
        margin-bottom: 10px;
    }

    h1 {
        font-size: 58px;
    }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
    header{
        margin-top: 15px;
        margin-bottom: 5px;
    }

    h1 {
        font-size: 70px;
    }
}

@media only screen and (min-width: 1025px) {
    header{
        margin-top: 20px;
        margin-bottom: 0;
    }

    h1 {
        font-size: 100px;
    }
}

</style>