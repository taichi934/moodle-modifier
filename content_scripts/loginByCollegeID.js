(() => {
  // login by <your college> id
  const a = document.getElementsByClassName(
    "btn btn-lg btn-block btn-warning"
  )[0];
  const url = a.href;
  location.assign(url);
})();
