var result = '';
var count = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul").childElementCount;
for (var i = 1; i <= count; i++) {
    var rank = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > div:nth-child(1) > p:nth-child(1)").innerText.replace(/位/, "");
    var title = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > div:nth-child(1) > p:nth-child(2) > span:nth-child(1)").innerText;
    var human = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > div:nth-child(1) > p:nth-child(2) > span:nth-child(3)").innerText;
    var point = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > div:nth-child(2) > p:nth-child(1)").innerText;
    var tmp = document.querySelector("#hundredTabPanel > div > div.usk-gp-index-div-list > ul > li:nth-child(" + i + ") > a > div:nth-child(2) > p:nth-child(2)").innerText.split('／');
    var worldRank = tmp[0].replace(/全国順位：/, "");
    var year = tmp[1];
    console.log( '| ' + rank + ' | ' + worldRank + ' | ' + point + ' | ' + year + ' | ' + title + ' | ' + human + ' |\n');
    result += '| ' + rank + ' | ' + worldRank + ' | ' + point + ' | ' + year + ' | ' + title + ' | ' + human + ' |\n';
}
prompt('Result', result);
