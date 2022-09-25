(() => {
  const toggleDarkMode = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // document.documentElement.setAttribute('data-theme', storedTheme)
  };

  let isDarkMode;
  chrome.storage.local.get(["isDarkMode"], (items) => {
    isDarkMode = items.isDarkMode;
    if (isDarkMode) {
      toggleDarkMode(isDarkMode);
    } else {
      isDarkMode = false;
    }
  });

  // popupでカラーテーマを変更したとき
  chrome.storage.onChanged.addListener((changes, namespace) => {
    isDarkMode = changes.isDarkMode;
    console.log("updated isDarkMode => " + isDarkMode);
    console.log(isDarkMode); // isDarkMode <= {newValue: true, oldValue: false}
    toggleDarkMode(isDarkMode.newValue);
  });

  //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  //     isDarkMode = request.isDarkMode;
  //     toggleDarkMode(isDarkMode);
  //   });
})();
