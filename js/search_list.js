const search = document.querySelector('.header__logo').children[2];
search.children[0].width = '20';
let check = true;
search.addEventListener('click', () => {
    const primary = document.querySelector('.content__primary');
    const nav = document.querySelector('.content__nav');
    if (check) {
        primary.style.display = 'none';
        nav.style.display = 'block';
        search.children[0].src = 'https://www.livescore.com/ls-web-assets/svgs/common/close-thin-c893a6857e7b74225b562a8b65eb31ed.svg';
    } else {
        primary.style.display = 'block';
        nav.style.display = 'none';
        search.children[0].src = 'https://www.livescore.com/ls-web-assets/svgs/common/search-1e1f1087166a2eae49a82dd529b7aafd.svg';
    }
    check = !check;
});