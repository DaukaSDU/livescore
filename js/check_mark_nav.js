const links = document.querySelectorAll('.page__nav>a');
const curr_page_title = document.querySelector('title').textContent.slice(0, -16);
for (let i = 0; i < links.length; i++) {
    if (links[i].children[1].textContent == curr_page_title) {
        links[i].children[1].id = 'active';
        links[i].children[0].children[0].src = URL_img[curr_page_title];
    }
}