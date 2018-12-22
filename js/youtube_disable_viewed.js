(function() {
  const selector = '#overlays > ytd-thumbnail-overlay-playback-status-renderer > yt-formatted-string';
  [...document.querySelectorAll(selector)]
      .map((e) => e.parentElement.parentElement.parentElement.parentElement.parentElement)
      .forEach((e) => e.style.opacity = 0.1);
})();
