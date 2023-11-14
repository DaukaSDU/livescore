const leagues = document.querySelectorAll('.content__nav>ul a');
for (let i = 0; i < leagues.length; i++) {
    leagues[i].addEventListener('click', () => {
        let league = leagues[i].children[1].textContent;
        switch(league) {
            case 'Premier League':
                localStorage.setItem('country', 'england');
                localStorage.setItem('league', 'premier-league');
                break;
            case 'La Liga':
                localStorage.setItem('country', 'spain');
                localStorage.setItem('league', 'laliga');
                break;
            case 'Serie A':
                localStorage.setItem('country', 'italy');
                localStorage.setItem('league', 'serie-a');
                break;
            case 'KPL':
                localStorage.setItem('country', 'kazakhstan');
                localStorage.setItem('league', 'premier-league');
                break;
            case 'Champions League':
                localStorage.setItem('league', '');
                showUCLgroups();
                break;
            default:
                localStorage.setItem('country', 'england');
                localStorage.setItem('league', 'premier-league');
                break;
        }
    });
}

function showUCLgroups() {
    let ul = document.querySelector('.content__nav>ul');
    ul.innerHTML = "";
    let back = document.createElement('a');
    back.textContent = '< back';
    back.href = 'main.html';
    ul.appendChild(back);
    for (let group of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
        let a = document.createElement('a');
        let img = document.createElement('img');
        let li = document.createElement('li');
        a.href = 'table.html';
        img.src = 'https://static.livescore.com/i2/fh/champions-league.jpg';
        img.alt = 'UCL';
        img.width = 18;
        li.textContent = 'Group ' + group;
        a.appendChild(img);
        a.appendChild(li);
        ul.appendChild(a);
        a.addEventListener('click', () => {
            localStorage.setItem('country', 'champions-league');
            localStorage.setItem('league', 'group-' + group.toLowerCase());
        });
        if ('group-' + group.toLowerCase() == localStorage.getItem('league')) {
            li.id = 'league';
        }
    }
}

async function saveUCLdates() {
    const url = 'https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=champions-league&Scd=group-b&Timezone=-7';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b866e0d96mshc05e7f70cf593a6p1ea8cdjsn0ca1d629e6ca',
            'X-RapidAPI-Host': 'livescore6.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}