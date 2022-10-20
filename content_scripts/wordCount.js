(() => {
  //   <textarea id="area">文字数 : 0 文字</textarea>
  //   <p id="inputlength1">0文字</p>
  // document.getElementById("area").onkeydown = () => {
  //   document.getElementById("inputlength").innerHTML =
  //     "文字数 : " + str.length + " 文字";
  // };

  let iframeArray = Array.from(document.getElementsByTagName("iframe"));
  iframeArray.pop();

  for (const iframe of iframeArray) {
    const pArray = iframe.contentDocument.getElementsByTagName("p");
    let count = 0;
    for (const p of pArray) {
      if (p.firstChild.length) count += p.firstChild.length;
    }
    console.log(count);
  }
})();

// 複数iframeがあり、最後のiframeは拡張機能が挿入したもの
// let iframe = document.getElementsByTagName("iframe")[0]
// iframe.contentDocument.getElementsByTagName("p")
// iframe.contentDocument.getElementsByTagName("p")[0].firstChild.length;
