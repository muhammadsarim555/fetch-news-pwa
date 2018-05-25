var apikey = "104edcbb7c304f3ab119f5ea23af1a09"
const main = document.querySelector ("#div");
const selector = document.querySelector('#selector')
const defineDefault = "the-washington-post"

window.addEventListener('load', async e => {
    updatedNews()
    // await updateSources()
    selector.value = defineDefault;

    // selector.addEventListener('change' , e=> {
        // updatedNews(e.target.value)
    // })
})

// async function updateSources(){
//     const res = await fetch (`https://newsapi.org/v1/sources`)
//     const json = await res.json()
//     console.log (json)
//     selector.innerHTML = json.sources
//         .map(src =>`<option value="${src.id}">${src.name}</option>`).join('\n')
// }

async function updatedNews (source = defineDefault) {
    const res = await fetch(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apikey}`)
    const json = await res.json();
    console.log(json)
    main.innerHTML = json.articles.map(createArticles).join('\n')
}

function createArticles(article) {
    return `
    <div class="col-md-8 col-md-offset-2">
            <h2 class='h2'>${article.title}</h2>
            <img class="img-rounded" width='100%' src="${article.urlToImage}"/>
            <p class='h4'>${article.description}</p>
        </div>
    `
}