var th = parseInt(document.querySelector('#LblPointBalance').innerText.replace(',', ''));
[...document.querySelectorAll('#TableApplyList > tbody > tr')].filter((tr) => parseInt(tr.children[2].innerText) !== NaN).filter((tr) => th < parseInt(tr.children[2].innerText.replace(',',''))).forEach((tr) => tr.style.display = 'none');
