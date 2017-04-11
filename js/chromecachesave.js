(function() {
  var data = document.getElementsByTagName("pre")[2].innerText.split('\n');
  var hoge = [];
  for (var i = 0; i < data.length; i++) {
    var d = data[i].substring(10, 57);
    d = d.replace(/ /g, "");
    if (d !== null && d.length > 0) {
      hoge.push(d);
    }
  }
  var blob = new Blob([hoge.join('\n')], {type: 'text/plain'});
  var url = window.URL.createObjectURL(blob);

  var a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.download = 'binary.txt';
  a.click();
})();
