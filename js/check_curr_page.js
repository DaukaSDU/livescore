const URL_img = {
    'Footballs': 'https://www.livescore.com/ls-web-assets/svgs/common/football-scores-active-bbdbd06988e3eeb0bc7440f02e090112.svg',
    'Favourites': 'https://www.livescore.com/ls-web-assets/svgs/common/favourites-active-0ca9601f7b40501174924024e45daa3a.svg',
    'News': 'https://www.livescore.com/ls-web-assets/svgs/common/news-article-active-ac3685b2d0d3bd04a29426965109d243.svg',
    'About': '../media/about-active.svg'
};

const header__nav = document.querySelectorAll('.header__main>a>span');
for (let i = 0; i < header__nav.length; i++) {
    const page_title = document.querySelector('title').textContent.slice(0, -16);
    if (header__nav[i].textContent == page_title) {
        header__nav[i].style.color = '#ff6b00'
        header__nav[i].parentElement.children[0].src = URL_img[page_title];
    }
}