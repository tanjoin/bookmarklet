var list = [...document.querySelectorAll('#myTopTabPanel > div > div.usk-gp-index-div-list > ul > li')];
var result = '';
for (var i = 0; i < list.length; i++) {
  var rank = list[i].children[0].children[0].innerText;
  var songName = list[i].children[0].children[1].innerText.split('\n')[0];
  var artistName = list[i].children[0].children[1].innerText.split('\n')[1];
  var pt = list[i].children[0].children[2].innerText;
  result += '| ' + rank + ' | ' + songName + ' | ' + artistName + ' | ' + pt + ' |\n';
}
prompt('Result', result);
