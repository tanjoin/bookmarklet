[...document.querySelectorAll("span.timestamp")]
  .forEach((span) => {
    const date = new Date(span.getAttribute('data-created-at') * 1000);
    const text = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    var s = document.createElement('div');
    s.innerText = text;
    span.parentNode.appendChild(s);
  });
