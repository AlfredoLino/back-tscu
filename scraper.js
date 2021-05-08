const scraper = require('scrape-it');


const scrapMoodFilm = async () => {
    try {
        const {data, response} = await scraper("https://agoodmovietowatch.com/mood/emotional/", {

            title: "div.entry-top",
            content: "div.entry-content"
        
        })
        const filter = e => e !== ''
        const filteredContent = data.content.split("\n").filter( filter ) 
        const filteredTitles = data.title.split("\n").filter( filter )

        console.log(filteredTitles,  "/////////////"  , filteredContent.filter(e => e !== '.'))
    } catch (error) {
        console.log(error)
    }
}
scrapMoodFilm()
/*
scraper("https://agoodmovietowatch.com/mood/emotional/", {
    title: "div.entry-top.long",
    content: "div.entry-content"

}).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`)
    console.log(data.content.split(".")[0])

})
*/