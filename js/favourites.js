const main_div = document.querySelector('.primary__container');
const forUser = {
    'kazakhstan': 'premier-league',
    'england': 'premier-league',
    'italy': 'serie-a',
    'spain': 'laliga'
};

const data = JSON.parse(localStorage.getItem('favourites'));
if (data == '') {
    main_div.textContent = 'You have no favourites';
}
for (let i = 0; i < data.length; i++) {
    let table__header__top = document.createElement('div');
    table__header__top.classList.add('table__header-top');

    let header__top__logo = document.createElement('div');
    header__top__logo.classList.add('header__top-logo');

    let img = document.createElement('img');
    img.width = '20';
    img.height = '20';
    img.src = data[i].img;

    let div = document.createElement('div');
    let span_league = document.createElement('span');
    let span_country = document.createElement('span');

    span_league.textContent = data[i].league;
    span_country.textContent = data[i].country;

    div.appendChild(span_league);
    div.appendChild(span_country);

    header__top__logo.appendChild(img);
    header__top__logo.appendChild(div);

    let svgHTML = 
                `<svg xmlns="http://www.w3.org/2000/svg" fill="#ff6b00" viewBox="0 0 20 20">
                    <path d="M10.247 0.558c0.108 0.054 0.197 0.142 0.25 0.25l2.662 5.37c0.081 0.163 0.237 0.277 0.418 0.303l5.947 0.86c0.304 0.044 0.514 0.326 0.47 0.63-0.017 0.12-0.075 0.233-0.163 0.318l-4.3 4.173c-0.132 0.128-0.192 0.312-0.16 0.493l1.015 5.895c0.052 0.303-0.15 0.59-0.453 0.642-0.12 0.020-0.244 0.001-0.352-0.055l-5.324-2.787c-0.16-0.084-0.353-0.084-0.515 0l-5.322 2.787c-0.272 0.142-0.608 0.037-0.75-0.235-0.056-0.108-0.076-0.231-0.055-0.352l1.015-5.895c0.032-0.18-0.029-0.365-0.16-0.493l-4.301-4.172c-0.22-0.214-0.226-0.565-0.012-0.785 0.085-0.088 0.197-0.145 0.319-0.163l5.947-0.86c0.18-0.026 0.337-0.14 0.418-0.303l2.661-5.371c0.137-0.274 0.47-0.386 0.745-0.25z"/>
                </svg>`;

    table__header__top.appendChild(header__top__logo);
    table__header__top.insertAdjacentHTML('beforeend', svgHTML);

    main_div.appendChild(table__header__top);

    table__header__top.addEventListener('click', () => {
        localStorage.setItem('country', data[i].country.toLowerCase());
        localStorage.setItem('league', forUser[data[i].country.toLowerCase()]);
        if (data[i].country.toLowerCase() == 'champions-league') {
            localStorage.setItem('league', 'group-' + data[i].league.charAt(6).toLowerCase());
        }
        location.href = 'table.html';
    });
}