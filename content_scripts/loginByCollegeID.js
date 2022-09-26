(() => {
  const toggleDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  let isDarkMode;
  chrome.storage.local.get(['isDarkMode'], (items) => {
    isDarkMode = items.isDarkMode;
    if (isDarkMode === undefined) {
      isDarkMode = false;
    }
    toggleDarkMode(isDarkMode);
  });

  window.addEventListener('load', () => {
    // login by <your college> id
    const a = document.getElementsByClassName(
      'btn btn-lg btn-block btn-warning'
    )[0];
    const url = a.href;
    location.assign(url);
  });
})();
