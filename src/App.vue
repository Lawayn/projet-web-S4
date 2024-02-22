<template>
  <!DOCTYPE html>
<html lang="eng">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The One Quiz</title>
</head>
<body>
    <header>
        <h1>The One Quiz</h1>
    </header>

    <main>
        <h2>Guess which character this quote belongs to?</h2>
        <h3>"{{ randomQuoteDialog }}"</h3>
    </main>

    <footer>
        <p>&copy; 2024 The One Quiz.</p>
    </footer>
</body>
</html>
</template>

<script>

export default {
  data() {
    return {
      books: [],
      randomBook: null,
      randomBookName: null,
      randomQuote : null,
      randomQuoteDialog : null
    };
  },
  created() {
    this.showBooks();
    this.showQuotes();
  },
  methods: {
    
    async showBooks() {
      const response = await fetch("https://the-one-api.dev/v2/book");
      const responseData = await response.json();
      this.books = responseData.docs;
      console.log(this.books);
      
      const randomIndex = Math.floor(Math.random() * this.books.length);
      this.randomBook = this.books[randomIndex];
      this.randomBookName = this.randomBook.name;
      console.log("Book :", this.randomBookName);
    },
    async showQuotes() {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer qPe6R8rbWTW7Yy4rpai0");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch("https://the-one-api.dev/v2/quote", requestOptions);
      const responseData = await response.json();
      this.quotes = responseData.docs;
      console.log(this.quotes);
      
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      this.randomQuote = this.quotes[randomIndex];
      this.randomQuoteDialog = this.randomQuote.dialog;
      console.log("Quote :", this.randomQuoteDialog);
    }
  }
};
</script>

<style>
  p {
    text-align: center; 
    font-size: 50px;
  }
</style>