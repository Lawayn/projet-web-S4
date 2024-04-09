export async function selectQuotes() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer qPe6R8rbWTW7Yy4rpai0");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://the-one-api.dev/v2/quote", requestOptions);
    const responseData = await response.json();
    return responseData.docs;
}

export async function selectMovies() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer qPe6R8rbWTW7Yy4rpai0");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://the-one-api.dev/v2/movie", requestOptions);
    const responseData = await response.json();
    return responseData.docs;
}

export async function selectOneCharacter(characterID) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer qPe6R8rbWTW7Yy4rpai0");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`https://the-one-api.dev/v2/character/${characterID}`, requestOptions);
    const responseData = await response.json();

    if (Array.isArray(responseData.docs) && responseData.docs.length > 0) {
        return responseData.docs[0];
    } else {
        return null;
    }
}

export async function selectRandomCharacters(numCharacters) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer qPe6R8rbWTW7Yy4rpai0");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://the-one-api.dev/v2/character", requestOptions);
    const responseData = await response.json();
    const characters = responseData.docs;

    const randomCharacters = [];
    for (let i = 0; i < numCharacters; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCharacters.push(characters[randomIndex]);
        characters.splice(randomIndex, 1);
    }
    return randomCharacters;
}