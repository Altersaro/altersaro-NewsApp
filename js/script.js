const newNews = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'

let currentId = 0;
let newsDisplay = document.querySelector('.displayNews');
let LoadMoreBtn = document.querySelector('.loadMore')
LoadMoreBtn.addEventListener('click',getNewNews)
let myButton = document.getElementById("myBtn");

getNews();

async function getIDNews(){
    let response = await fetch(newNews);
    news = await response.json();
    return news
}

async function getNews(){
   await getIDNews()
    for(let i=0; i<10; i++){
        let getNews = await fetch(`https://hacker-news.firebaseio.com/v0/item/${news[currentId++]}.json?print=pretty`)
        let newNews = await getNews.json();
        displayNews(newNews).catch(e=>{
          let errorString = document.createElement('h2');
          errorString.classList.add('error');
          errorString.innerHTML = 'Please reload page'
          newsDisplay.appendChild(errorString)
        })
    }
}

async function getNewNews(){
    await getIDNews();
    currentId++
    await getNews()
}

async function displayNews(newNews){
    let newsContainer = document.createElement('div');
    newsContainer.classList.add('newsContainer','card-body','animate__animated','animate__bounceInLeft')
    newsDisplay.appendChild(newsContainer)

        let newsTitle =document.createElement('h2');
        newsTitle.classList.add('newsTitle');
        newsTitle.innerHTML = newNews.title
        newsContainer.appendChild(newsTitle)

        let newsDate = document.createElement('p');
        newsDate.classList.add('newsDate');
        let unixTime = newNews.time
        let milliseconds = unixTime * 1000
        let dateObject = new Date(milliseconds)
        let dateFormat = dateObject.toLocaleDateString()
        newsDate.innerHTML = dateFormat
        newsContainer.appendChild(newsDate);


        let newsLink = document.createElement('a');
        newsLink.classList.add('newsLink','btn','btn-primary');
        newsLink.href = newNews.url
        newsLink.setAttribute('target','_blank')
        newsLink.innerHTML = "Go to News"
        newsContainer.appendChild(newsLink);
    }




    window.onscroll = function() {scrollFunction()};
    myButton.addEventListener('click', topFunction);

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        myButton.style.display = "block";
      } else {
        myButton.style.display = "none";
      }
    }

    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
