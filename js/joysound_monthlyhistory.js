var div = document.querySelector('#historyTabPanel > div > div > div:nth-child(5)');
var result = '';
var data = [...div.children].map((ul) => ul.children[0]).map((li) => {
  return {
    rank: li.querySelector('div:nth-child(1) > a > div > p.usk-score > span.usk-br-sp > strong').innerText,
    headcount: li.querySelector('div:nth-child(1) > a > div > p.usk-score > span.usk-br-sp > var').innerText,
    point: li.querySelector('div:nth-child(1) > a > div > p.usk-score > span:nth-child(2) > var').innerText,
    name: li.querySelector('div:nth-child(1) > a > div > p.usk-list-gp > var:nth-child(1)').innerText,
    singer: li.querySelector('div:nth-child(1) > a > div > p.usk-list-gp > var:nth-child(3)').innerText
  };
}).map((item) => {
    return '|' + item.rank + '|' + item.headcount + '人|' + item.point + '点|' + item.name + '|' + item.singer + '|';
}).join('\n');
prompt('Result', data);
