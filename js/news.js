const container = document.querySelector('.content__container');
let news = [];
getNews();

async function getNews() {
    const url = 'https://livescore6.p.rapidapi.com/news/v2/list';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b866e0d96mshc05e7f70cf593a6p1ea8cdjsn0ca1d629e6ca',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        news = result.topStories.filter(item => item.categoryLabel == 'Football');
        container.innerHTML = "";
        container.classList.remove('loading');
        for (let i = 0; i < news.length; i++) {
            let link = document.createElement('a');
            link.href = 'news_single_page.html';
            let div = document.createElement('div');
            let div_img = document.createElement('div');
            let div_detail = document.createElement('div');
            let img = document.createElement('img');
            let title = document.createElement('h2');
            let div_span = document.createElement('div');
            let span_category = document.createElement('span');
            let span_date = document.createElement('span');
    
            div.classList.add('content__post');
            div_img.classList.add('content__post-img');
            div_detail.classList.add('content__post-detail');
            
            img.src = news[i].mainMedia[0].gallery.url;
            img.alt = news[i].mainMedia[0].gallery.alt;
            title.textContent = news[i].title;
            span_category.textContent = news[i].categoryLabel;
            let timeDifference = new Date().getTime() - new Date(news[i].publishedAt).getTime();
            let hoursDifference = Math.floor(timeDifference / 1000 / 60 / 60);
            span_date.textContent = (hoursDifference < 24) ? hoursDifference + ' hour(s)' : Math.floor(hoursDifference / 24) + ' day(s)';

            div_span.appendChild(span_category)
            div_span.appendChild(span_date)
            div_detail.appendChild(title);
            div_detail.appendChild(div_span);
            div_img.appendChild(img);
            div.appendChild(div_img);
            div.appendChild(div_detail);
            link.appendChild(div);
            container.appendChild(link);

            link.addEventListener('click', () => {
                localStorage.setItem('news', news[i].id);
            });
        }


    } catch (error) {
        console.error(error);
    }
}
