/*
 メモ：名前とスコアはリストで送られる
*/


function escapeHTML(str) {
  return str
    .replace(/\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\v/g, ' ')
    .replace(/\f/g, ' ');
}

let clickedOni = 0;

async function displayRanking(difficulty) {
    document.querySelector(`#${difficulty}Button`).style.border =
        'inset rgb(20, 20, 50)';
    const response = await fetch(
        '/solo/getRanking',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ difficulty: difficulty }),
        },
    );
    const responseJson = await response.text();
    const responseObj = JSON.parse(responseJson);
    const ranking = responseObj['top10Results'];

  for (let i = 0; i < 10; i++) {
    const rankId = document.querySelector(`#rank${i + 1}`);
    const nameId = document.querySelector(`#name${i + 1}`);
    const scoreId = document.querySelector(`#score${i + 1}`);
    rankId.innerText = '';
    nameId.textContent = '';
    scoreId.innerText = '';
  }

  for (let i = 0; i < ranking.length; i++) {
    const rankId = document.querySelector(`#rank${i + 1}`);
    const nameId = document.querySelector(`#name${i + 1}`);
    const scoreId = document.querySelector(`#score${i + 1}`);
    rankId.innerText = `${i + 1}位`;
    nameId.textContent = `${escapeHTML(ranking[i]['userName'])}`;
    scoreId.innerText = `${ranking[i]['score']}`;
  }
    document.querySelector(`#${difficulty}Button`).style.background =
        'rgba(255, 255, 255, 0.15)';
    document.querySelector(`#${difficulty}Button`).style.border =
        'outset rgb(20, 20, 50)';
}

document.querySelector('#easyButton').onclick = async (event) => {
    await displayRanking('easy');
    document.querySelector('#normalButton').style.background = 'midnightblue';
    document.querySelector('#hardButton').style.background = 'midnightblue';
    if (clickedOni) {
        document.querySelector('#oniButton').style.background = 'midnightblue';
    }
};

document.querySelector('#normalButton').onclick = async (event) => {
    await displayRanking('normal');
    document.querySelector('#easyButton').style.background = 'midnightblue';
    document.querySelector('#hardButton').style.background = 'midnightblue';
    if (clickedOni) {
        document.querySelector('#oniButton').style.background = 'midnightblue';
    }
};

document.querySelector('#hardButton').onclick = async (event) => {
    await displayRanking('hard');
    document.querySelector('#easyButton').style.background = 'midnightblue';
    document.querySelector('#normalButton').style.background = 'midnightblue';
    if (clickedOni) {
        document.querySelector('#oniButton').style.background = 'midnightblue';
    }
};

document.querySelector('#oniButton').onclick = async (event) => {
    await displayRanking('oni');
    document.querySelector('#oniButton').style.color = 'white';
    document.querySelector('#easyButton').style.background = 'midnightblue';
    document.querySelector('#normalButton').style.background = 'midnightblue';
    document.querySelector('#hardButton').style.background = 'midnightblue';
    clickedOni = 1;
};

onload = async (event) => {
    await displayRanking('easy');
    document.querySelector('#top10').style.visibility = 'visible';
    document.querySelector('#titleButton').style.visibility = 'visible';
    document.querySelector('#easyButton').style.visibility = 'visible';
    document.querySelector('#normalButton').style.visibility = 'visible';
    document.querySelector('#hardButton').style.visibility = 'visible';
    document.querySelector('#oniButton').style.visibility = 'visible';
};

// Enterが押されたらタイトルへ戻る
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.querySelector('#titleButton').dispatchEvent(
            new PointerEvent('click'),
        );
    }
});
