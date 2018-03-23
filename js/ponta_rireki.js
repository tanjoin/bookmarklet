var result = [...document.querySelector(".tableHistoryRecord01 > tbody").children]
  .map((tr) => [...tr.children])
  .map((tds) =>  tds.map((td) => td.innerText))
  .map((tds) => tds.join('|'))
  .map((td) => '|' + td + '|')
  .map((td) => td.replace(/\r?\n/g,""))
  .join('\n');

prompt('Result', result);
