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

  // popupでカラーテーマを変更したとき
  chrome.storage.onChanged.addListener((changes, namespace) => {
    isDarkMode = changes.isDarkMode;
    console.log('updated isDarkMode => ' + isDarkMode);
    console.log(isDarkMode); // isDarkMode <= {newValue: true, oldValue: false}
    toggleDarkMode(isDarkMode.newValue);
  });
})();
