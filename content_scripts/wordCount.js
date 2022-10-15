(() => {
  //   <textarea id="area">文字数 : 0 文字</textarea>
  //   <p id="inputlength1">0文字</p>
  document.getElementById('area').onkeydown = () => {
    document.getElementById('inputlength').innerHTML =
      '文字数 : ' + str.length + ' 文字';
  };
})();
