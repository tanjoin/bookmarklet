var list = document.getElementById('usk-mypage-mysong-list').children[0].children;
var result = '';
for (var i = 0; i < list.length; i++) {
  var data = list[i].children[1].children[0].children[0].innerText.split('／');
  var date = list[i].children[1].children[0].children[2].children[1].children[1].innerText;
  result += '| ' + data[0] + ' | ' + data[1] + ' | ' + date + ' |\n';
}
prompt('Result', result);
