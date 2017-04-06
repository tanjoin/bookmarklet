(function(){
  var url = "https://tanjoin.github.io/acc/maker.html" +
      "?title=" + encodeURIComponent(document.title) +
      "&url=" + encodeURIComponent(document.URL);
  var d = document.getSelection();
  var links = d.getRangeAt(0).cloneContents().querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    url += "url[" + i + "]=" + links[i];
  }
  url += "&description=" + encodeURIComponent(d);
  window.open(url);
})();
