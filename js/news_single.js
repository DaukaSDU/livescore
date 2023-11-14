const news_id = localStorage.getItem('news');
const div = document.querySelector('.content');
const number_of_p = 7;

getData();

async function getData() {
    const url = `https://livescore6.p.rapidapi.com/news/v2/detail?id=${news_id}`;
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

        document.querySelector('.loader').remove();
        div.classList.remove('loading');

        let div_header = document.createElement('div');
        div_header.classList.add('content__header');
        div_header.textContent = result.article.title;
        div.appendChild(div_header);

        let div_container = document.createElement('div');
        div_container.classList.add('content__container')
        let div_author = document.createElement('div');
        div_author.classList.add('conent__container-author');
        let span_1 = document.createElement('span');
        let span_1_1 = document.createElement('span');
        let span_1_1_1 = document.createElement('span');
        let span_1_1_2 = document.createElement('span');
        let span_2 = document.createElement('span');
        let span_2_1 = document.createElement('span');
        let span_2_2 = document.createElement('span');
        let author_img = document.createElement('img');
        author_img.src = 'https://www.livescore.com' + result.article.publishedBy.logo;
        author_img.width = 30;
        author_img.height = 30;
        span_1_1_1.textContent = (result.article.authors.length == 0) ? '' : result.article.authors[0].name;
        span_1_1_2.textContent = result.article.publishedBy.name;
        span_2_1.textContent = result.article.publishedDate;
        span_2_2.textContent = result.article.publishedTime;

        span_2.appendChild(span_2_1);
        span_2.appendChild(span_2_2);
        span_1.appendChild(author_img);
        span_1.appendChild(span_1_1);
        span_1_1.appendChild(span_1_1_1);
        span_1_1.appendChild(span_1_1_2);
        div_author.appendChild(span_1);
        div_author.appendChild(span_2);
        div_container.appendChild(div_author);
        div.appendChild(div_container);

        let container_div_img = document.createElement('div');
        container_div_img.classList.add('content__container-img');
        let img = document.createElement('img');
        img.src = result.article.mainMedia[0].original.url;
        img.alt = result.article.mainMedia[0].original.alt;
        container_div_img.appendChild(img);
        div_container.appendChild(container_div_img);

        let img_title = document.createElement('p');
        img_title.id = 'img__title';
        img_title.textContent = 'Football Live News';
        div_container.appendChild(img_title);

        let p = [];

        for (let i = 0; i < number_of_p; i++) {
            p[i] = document.createElement('p');
            div_container.appendChild(p[i]);
        }

        p[0].textContent = result.article.seo.description;

        for (let i = 1; i < number_of_p; i++) {
            p[i].textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus facere nostrum quasi cupiditate dolorum sed. Sed mollitia ipsam incidunt voluptatem?';
        }
    } catch (error) {
        console.error(error);
    }
}