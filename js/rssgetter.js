var links = Array.prototype.slice.call(document.getElementsByTagName('link'))
  .filter(function(link) {
    return link.type === "application/rss+xml" || link.type === "application/atom+xml";
  })
  .map(function(link) {
    return link.href;
  });

prompt(links.join('\n'), links.join('\n'));
