var result = [...document.querySelectorAll('#TPointRirekiList > table > tbody > tr')]
  .filter((tr) => tr.className != "TPcolor0")
  .map((tr) => [...tr.children])
  .map((tds) => tds.filter((td) => !td.className.includes('spVisible')))
  .map((tds) => tds.map((td) => td.innerText))
  .map((tds) => tds.join('|'))
  .map((td) => '|' + td + '|')
  .map((td) => td.replace(/\r?\n/g, ""))
  .join('\n');

prompt("Result", result);
