let channelId = document.querySelector('#watch7-content > meta[itemprop="channelId"]').content;
if (channelId) {
  window.open(window.location.href + "&list=UU" + document.querySelector('#watch7-content > meta[itemprop="channelId"]').content.slice(2));
} else {
  window.location.reload();
}