let country = localStorage.getItem('country');
let league = localStorage.getItem('league');
let today = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
const forUser = {
    'kazakhstan': 'KPL',
    'england': 'Premier League',
    'italy': 'Serie A',
    'spain': 'La Liga',
    'champions-league': 'Group ' + league.charAt(6).toUpperCase()
}
const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

if (country == 'champions-league') {
    showUCLgroups();
} else {
    document.querySelectorAll('.content__nav>ul a').forEach(item => {
        if (item.children[1].textContent == forUser[country]) {
            item.id = 'league';
        }
    });
}

const table = document.querySelector('table');
const span__league = document.querySelector('.header__top-logo div').children[0];
const span__country = document.querySelector('.header__top-logo div').children[1];
const img__country = document.querySelector('.header__top-logo img');
img__country.src = `https://static.livescore.com/i2/fh/${country}.jpg`;
img__country.alt = `${country}`;

span__league.textContent = forUser[country];
span__country.textContent = country.charAt(0).toUpperCase().toString() + country.slice(1);

const img = document.querySelector('.table__header-top').children[1];
let fav = getCurrentLeague();

img.src = (local_includes(fav)) ? 'media/fav-icon-active.svg' : 'media/fav-icon.svg';

img.addEventListener('click', () => {
    if (local_includes(fav)) {
        local_remove(fav);
        img.src = 'media/fav-icon.svg';
        return;
    }
    local_add(fav);
    img.src = 'media/fav-icon-active.svg';
});

function getCurrentLeague() {
    return JSON.stringify({
                "img": `${img.parentElement.children[0].children[0].src}`,
                "league": `${img.parentElement.children[0].children[1].children[0].textContent}`,
                "country": `${img.parentElement.children[0].children[1].children[1].textContent}`
            });
}

function local_includes(fav) {
    let favourites = JSON.parse(localStorage.getItem('favourites'));
    if (!favourites) {
        favourites = []; 
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    favourites = favourites.map(item => JSON.stringify(item));
    return favourites.includes(fav);
}

function local_remove(fav) {
    let favourites = JSON.parse(localStorage.getItem('favourites'))
                            .map(item => JSON.stringify(item))
                            .filter(item => item != fav)
                            .map(item => JSON.parse(item));
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

function local_add(fav) {
    let favourites = JSON.parse(localStorage.getItem('favourites'))
                            .map(item => JSON.stringify(item));
    favourites.push(fav);
    favourites = favourites.map(item => JSON.parse(item));
    localStorage.setItem('favourites', JSON.stringify(favourites));
}


const buttons = document.querySelector('.buttons');
buttons.children[0].style.color = '#ff6b00'
getMatchFixtures(country, league);
for (let i = 0; i < buttons.children.length; i++) {
    buttons.children[i].addEventListener('click', () => {
        for (let i = 0; i < buttons.children.length; i++) {
            buttons.children[i].style.color = '#aaa';
        }
        buttons.children[i].style.color = '#ff6b00';
        switch(buttons.children[i].textContent) {
            case 'Table':
                getTable();
                break;
            case 'Fixtures':
                getMatchFixtures(country, league);
                break;
            default:
                getMatchResults(country, league);
                break;
        }
    });
}

async function getTable() {
    let teams = [];
    let url = `https://livescore6.p.rapidapi.com/leagues/v2/get-table?Category=soccer&Ccd=${country}&Scd=${league}`;
    if (country == 'champions-league') url = `https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=champions-league&Scd=${league}&Timezone=-7`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b866e0d96mshc05e7f70cf593a6p1ea8cdjsn0ca1d629e6ca',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };

    try {
        hide_content();
        loading();
        const response = await fetch(url, options);
        let result = await response.json();
        if (country == 'champions-league') result = result.Stages[0];
        teams = result.LeagueTable.L[0].Tables[0].team;
        stoploading();
        table.style.display = 'table';

        for (let i = 0; i < teams.length; i++) {
            let tr = document.createElement('tr');
            let tds = [];

            for (let i = 0; i < 10; i++) {
                tds[i] = document.createElement('td')
            }

            tds[0].textContent = teams[i].rnk;
            
            const link = document.createElement('a');
            link.classList.add('table__team');
            link.href = '#';

            const img = document.createElement('img');
            img.width = 20;
            img.height = 20;
            img.src = `https://lsm-static-prod.livescore.com/medium/${teams[i].Img}`;

            const span = document.createElement('span');
            span.textContent = teams[i].Tnm;

            link.appendChild(img);
            link.appendChild(span);

            tds[1].appendChild(link);
            tds[2].textContent = teams[i].pld;
            tds[3].textContent = teams[i].win;
            tds[4].textContent = teams[i].drwn;
            tds[5].textContent = teams[i].lst;
            tds[6].textContent = teams[i].gf;
            tds[7].textContent = teams[i].ga;
            tds[8].textContent = teams[i].gd;
            tds[9].textContent = teams[i].pts;

            for (let i = 3; i <= 7; i++) {
                tds[i].classList.add('hide_on_mobile');
            }

            for (let i = 0; i < tds.length; i++) {
                tr.appendChild(tds[i]);
            }

            table.appendChild(tr);
        }

    } catch (error) {
        console.error(error);
    }
}

async function getMatchFixtures(country, league) {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=${country}&Scd=${league}&Timezone=-7`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b866e0d96mshc05e7f70cf593a6p1ea8cdjsn0ca1d629e6ca',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };
    
    try {
        hide_content();
        loading();
        const response = await fetch(url, options);
        const result = await response.json();
        stoploading();
        const ul = document.createElement('ul');
        const events = result.Stages[0].Events;
        const days = events.map(item => Math.floor(item.Esd / 1000000));
        let index = -1;
        if (events[0].Eps == 'NS') {
            index = 0;
        }
        if (events[events.length - 1].Eps != 'NS') {
            ul.innerHTML = `
                <li>There are no games  available</li>
            `;
            table.parentElement.appendChild(ul);
            return;
        }
        while (index == -1) {
            index = Array.from(days).indexOf(today++);
        }
        for (let i = index; i < events.length; i++) {
            if (events[i].Eps != 'NS') continue;
            let hour = (events[i].Esd % 1000000 + 130000) / 100;
            let day = Math.floor(events[i].Esd / 1000000) % 100;
            let month = months[Math.floor(events[i].Esd / 100000000) % 100];
            if (hour >= 2400) {
                hour -= 2400;
                hour = `0${hour}`;
                day++;
            }
            hour = hour.toString();
            let time = `${hour.slice(0, 2)} : ${hour.slice(2)}`
            const team1 = events[i].T1[0];
            const team2 = events[i].T2[0];
            const li = `
                <li>
                    <div>
                        ${day} ${month}<br>
                        ${time}
                    </div>
                    <div class="match">
                        <div>
                            <div>
                                <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team1.Img}" alt="logo">
                                <span>${team1.Nm}</span>
                            </div>
                            <span></span>
                        </div>
                        <div>
                            <div>
                                <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team2.Img}" alt="logo">
                                <span>${team2.Nm}</span>
                            </div>
                            <span></span>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </li>
            `;
            ul.insertAdjacentHTML('beforeend', li);
        }
        table.parentElement.appendChild(ul);
    } catch (error) {
        console.error(error);
    }
}

async function getMatchResults(country, league) {
    const url = `https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=${country}&Scd=${league}&Timezone=-7`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b866e0d96mshc05e7f70cf593a6p1ea8cdjsn0ca1d629e6ca',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };
    
    try {
        hide_content();
        loading();
        const response = await fetch(url, options);
        const result = await response.json();
        stoploading();
        const ul = document.createElement('ul');
        const events = result.Stages[0].Events;
        const days = events.map(item => Math.floor(item.Esd / 1000000));
        let index = -1;
        if (events[events.length - 1].Eps != 'NS') {
            index = events.length - 1;
        }
        if (events[0].Eps == 'NS') {
            ul.innerHTML = `
                <li>There are no games  available</li>
            `;
            table.parentElement.appendChild(ul);
            return;
        }
        while (index == -1) {
            index = Array.from(days).indexOf(++today);
        }
        for (let i = 0; i <= index; i++) {
            if (events[i].Eps == 'NS') break;
            let hour = (events[i].Esd % 1000000 + 130000) / 100;
            let day = Math.floor(events[i].Esd / 1000000) % 100;
            let month = months[Math.floor(events[i].Esd / 100000000) % 100];
            if (hour >= 2400) {
                hour -= 2400;
                day++;
            }
            const team1 = events[i].T1[0];
            const team2 = events[i].T2[0];
            const li = `
                <li>
                    <div>
                        ${day} ${month}<br>
                        ${events[i].Eps}
                    </div>
                    <div class="match">
                        <div>
                            <div>
                                <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team1.Img}" alt="logo">
                                <span>${team1.Nm}</span>
                            </div>
                            <span>${events[i].Tr1}</span>
                        </div>
                        <div>
                            <div>
                                <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team2.Img}" alt="logo">
                                <span>${team2.Nm}</span>
                            </div>
                            <span>${events[i].Tr2}</span>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </li>
            `;
            ul.insertAdjacentHTML('afterbegin', li);
        }
        table.parentElement.appendChild(ul);
    } catch (error) {
        console.error(error);
    }
}

function hide_content() {
    for (let i = 0; i < table.parentElement.children.length; i++) {
        table.parentElement.children[i].style.display = 'none';
    }
}

function loading() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    table.parentElement.appendChild(loader);
    table.parentElement.classList.toggle('loading');
}

function stoploading() {
    document.querySelector('.loader').remove();
    table.parentElement.classList.remove('loading');
}