const months = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const days = ['', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const league_name = {
    'Kazakhstan': 'premier-league',
    'England': 'premier-league',
    'Italy': 'serie-a',
    'Spain': 'laliga',
    'Champions League A': 'group-a',
    'Champions League B': 'group-b',
    'Champions League C': 'group-c',
    'Champions League D': 'group-d',
    'Champions League E': 'group-e',
    'Champions League F': 'group-f',
    'Champions League G': 'group-g',
    'Champions League H': 'group-h'
};

const league_posts = document.querySelectorAll('.primary__post');
const countries = Array.from(document.querySelectorAll('.league__country')).map(item => item.textContent);
const today = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();

showMatchList(today);

const primary__header__img = document.querySelector('.primary__header').children[1];
for (let i = -2; i < 3; i++) {
    let dayOfWeek = new Date().getDay() + i;
    if (dayOfWeek <= 0) dayOfWeek += 7;
    const sp = `
        <span>
            <span>${days[dayOfWeek]}</span>
            ${today % 100 + i} ${months[Math.floor(today / 100) % 100]}
        </span>
    `;
    primary__header__img.insertAdjacentHTML('beforebegin', sp);
}

const primary__dates = document.querySelectorAll('.primary__header>span');
for (let i = 0; i < primary__dates.length; i++) {
    if (primary__dates[i].children[0].textContent == `${days[new Date().getDay()]}`) {
        primary__dates[i].classList.add('active');
    }
    primary__dates[i].addEventListener('click', () => {
        primary__dates.forEach(item => {
            item.classList.remove('active');
        })
        primary__dates[i].classList.add('active');
        showMatchList(today - 2 + i);
    });
}

function showMatchList(day) {
    league_posts.forEach(post => {
        for (let i = 1; i < post.children.length; i++) {
            post.children[i].remove();
        }
        post.insertAdjacentHTML('beforeend', `
            <div class="loader__div">
                <div class="loader"></div>                  
            </div>  
        `);
    });
        

    for (let i = 0; i < league_posts.length; i++) {
        const matchList = getMatchList(countries[i].toLowerCase(), league_name[countries[i]]);
        const ul = document.createElement('ul');
        matchList.then(result => {
            const events = result.Stages[0].Events;
            const days = events.map(item => Math.floor(item.Esd / 1000000));
            const indices = [];
            Array.from(days).forEach((element, index) => {
                if (element === day) {
                    indices.push(index);
                }
            });
            if (indices.length == 0) {
                ul.innerHTML = `
                    <li>There is no matches</li>
                `;
            } else {
                for (let i = 0; i < indices.length; i++) {
                    const team1 = events[indices[i]].T1[0];
                    const team2 = events[indices[i]].T2[0];
                    const li = `
                        <li>
                            <div>${events[indices[i]].Eps}</div>
                            <div class="match">
                                <div>
                                    <div>
                                        <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team1.Img}" alt="logo">
                                        <span>${team1.Nm}</span>
                                    </div>
                                    <span>${events[indices[i]].Tr1}</span>
                                </div>
                                <div>
                                    <div>
                                        <img width="20" height="20" src="https://lsm-static-prod.livescore.com/medium/${team2.Img}" alt="logo">
                                        <span>${team2.Nm}</span>
                                    </div>
                                    <span>${events[indices[i]].Tr2}</span>
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </li>
                    `;
                    ul.insertAdjacentHTML('afterbegin', li);
                }
            }
            league_posts[i].children[1].remove();
            league_posts[i].appendChild(ul);
        });
        league_posts[i].addEventListener('click', () => {
            localStorage.setItem('country', countries[i].toLowerCase());
            localStorage.setItem('league', league_name[countries[i]]);
            location.href = '../table.html';
        });
    }
}

async function getMatchList(country, league) {
    if (league.slice(0, 5) == 'group') country = 'champions-league';
    const url = `https://livescore6.p.rapidapi.com/matches/v2/list-by-league?Category=soccer&Ccd=${country}&Scd=${league}&Timezone=-7`;
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
        return result;
    } catch (error) {
        console.error(error);
    }
}