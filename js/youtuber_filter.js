[...document.querySelectorAll("ytd-video-renderer")]
    .filter((yvr) => {
          return yvr.querySelector('#byline > a').innerText === 'SeikinTV' ||
          yvr.querySelector('#byline > a').innerText === 'ヒカル（Hikaru）';
    })
    .forEach((yvr) => yvr.style.display="none");
