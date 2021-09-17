
const Reddit = {
    async getSubRedditData(subReddit) {
        // const response = await fetch(`https://www.reddit.com/r/${subReddit}.json`);
        // const data = await response.json();
        // //console.log(data);
        // return data;

        return fetch(`https://www.reddit.com/r/${subReddit}.json`).then(response => response.json()).catch(error => error);
    },

    async getSubRedditComments(permalink) {
        const response = await fetch(`https://www.reddit.com${permalink}.json`);
        const data = await response.json();
        return data;
    },

    subReddits: {
        Memes: 'memes',
        Pics: 'pics',
        Funny: 'funny',
        'One Piece': 'OnePiece',
        'Damn thats interesting': 'Damnthatsinteresting',
        'Cringetopia': 'Cringetopia',
        'Minecraft': 'Minecraft',
        'League of legends': 'leagueoflegends',
        'About Tinder': 'Tinder',
        'Politics': 'politics',
        'Movies': 'movies',
        'Gaming': 'gaming',
        'Final fantasy X': 'ffxiv',
        'Genshin Impact': 'Genshin_Impact',
        'No Stupid Questions': 'NoStupidQuestions',
        'Ask Reddit': 'AskReddit',
        'News': 'news',
        'Public Freakout': 'PublicFreakout',
        'Unexpected': 'unexpected',
        'Ask Men': 'AskMen',
        'Home': 'Home',
    }


}

export default Reddit;