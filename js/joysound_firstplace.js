var count = document.querySelector("#firstTabPanel > div > div.usk-gp-index-div-list > ul").childElementCount;
var result = "";
for (var i = 1; i <= count; i++) {
  var when = document.querySelector("#firstTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > p:nth-child(1)").innerText;
  var point = document.querySelector("#firstTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > p:nth-child(2)").innerText;
  var title = document.querySelector("#firstTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > p:nth-child(3) > var:nth-child(1)").innerText;
  var human = document.querySelector("#firstTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > p:nth-child(3) > var:nth-child(3)").innerText;
  console.log('| ' + when + ' | ' + point + ' | ' + title + ' | ' + human + ' |');
  result += '| ' + when + ' | ' + point + ' | ' + title + ' | ' + human + ' |\n';
}
prompt('Result', result);
