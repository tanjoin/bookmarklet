const selector = '#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.file > div.blob-wrapper.data.type-java > table > tbody > tr';
document.querySelectorAll(selector).forEach((tr) => tr.children[0].onclick = function() {
  tr.style.display = "none";
});
