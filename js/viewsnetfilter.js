(function() {
   [...document.querySelector('#DtlCampList > tbody').children].map((tr) => tr.children).reduce((accumulator, currentValue) =>
   [...accumulator].concat([...currentValue])).filter((td) => td.children[0].querySelector('img.entry_icon').src.indexOf('IMG/icon_entry.gif') > 0).forEach((td) => td.style.display ="none");
})();
