const list = document.getElementById('usk-mypage-history-index-list').children;
const result = '';
for (var i = 0; i < list.length; i++) {
  var data = list[i].children[0].children[0].children[0].innerText.split('／');
  var date = list[i].children[0].children[0].children[2].innerText.substr(5);
  result += '| ' + date + ' | ' + data[0] + ' | ' + data[1] + ' |\n';
}
prompt('Result', result);
