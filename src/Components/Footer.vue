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
        bottom: 2vw;
        left: 50%;
        transform: translateX(-50%);
    }
    footer p{
        color: #132F2A;
        font-size: 20px;
    }
</style>