(() => {
    //   <textarea id="area">文字数 : 0 文字</textarea>
    //   <p id="inputlength1">0文字</p>
    // document.getElementById("area").onkeydown = () => {
    //   document.getElementById("inputlength").innerHTML =
    //     "文字数 : " + str.length + " 文字";
    // };

    let iframeArray = Array.from(document.getElementsByTagName('iframe'));
    iframeArray.pop();

    for (const iframe of iframeArray) {
        addWordCountDOM(iframe);
        const pArray = getPtags(iframe); // 入力してないとpないかも．<body></body>だけ
        const textarea = pArray[0].parentNode;
        textarea.onkeydown = () => {
            let count = 0;
            const temp_pArray = getPtags(iframe);
            for (const p of temp_pArray) {
                if (p.firstChild.length) count += p.firstChild.length;
            }
            console.log(count);
            reflectCountToDOM(iframe, count);
        };
    }
})();

function addWordCountDOM(iframe) {
    const wordCountWrapper = iframe.contentDocument.createElement('div');
    wordCountWrapper.className = 'word-count-wrapper';
    const wordCount = contentDocument.createElement('span');
    wordCount.className = 'word-count';
    wordCount.innerHTML = `<span>文字数：0 文字</span>`;
    wordCountWrapper.append(wordCount);

    iframe.contentDocument
        .querySelector('table.mceLayout .mceFirst div')
        .append(wordCountWrapper);
}

function getPtags(iframe) {
    return iframe.contentDocument.getElementsByTagName('p');
}

function reflectCountToDOM(iframe, count) {
    const span = iframe.contentDocument.getElementsByClassName('word-count')[0];
    span.innerHTML = `<span>文字数：${count} 文字</span>`;
}
