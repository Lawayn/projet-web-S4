<template>
    <footer>
        <p>&copy; 2024 The One Quiz.</p>
    </footer>
</template>

<script>
    export default {
      name: "Footer"  
    }
</script>

<style>

footer{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
}

footer p{
    color: #132F2A;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-style: normal;
}

@media only screen and (max-width: 600px) {
    footer{
        bottom: 5vw;
    } 

    footer p{
        font-size: 16px;
    }
}

@media only screen and (min-width: 601px) and (max-width: 1024px) {
    footer{
        bottom: 3vw;
    } 

    footer p{
        font-size: 18px;
    }
}

@media only screen and (min-width: 1025px) {
    footer{
        bottom: 1vw;
    } 


    footer p{
        font-size: 20px;
    }
}

</style>