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
    const res = await fetch(`https://newsapi.org/v2/everything?q=apple&from=2018-05-23&to=2018-05-23&sortBy=popularity&apiKey=${apikey}`)
    const json = await res.json();
    var imagesArray = [];
    for (let key in json.articles) {
        imagesArray.push(json.articles[key].urlToImage)
    }
    console.log(imagesArray, "Imagess")
    var flag = 0;
    var timer;
    console.log(imagesArray[3])
    document.getElementById('img').style.backgroundImage = "url(" +imagesArray[3]+")"
    function images(){
        if (flag === imagesArray.length) {
            flag = 0
            console.log(flag, 'flag if')
            document.getElementById('img').style.backgroundImage = "url(" +imagesArray[flag]+")"
        }    
        else{
            document.getElementById('img').style.backgroundImage = "url(" +imagesArray[flag]+")"
            console.log(flag , 'flag else')
        }
    }
    
    timer = setInterval(() => {
        flag++
        images()
     }, 3000)
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