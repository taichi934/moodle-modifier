const toggleDarkMode = (isDarkMode) => {
  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  // document.documentElement.setAttribute('data-theme', storedTheme)
};

let isDarkMode;
chrome.storage.local.get(["isDarkMode"], (result) => {
  // storageに値がなければundedinedを返す
  isDarkMode = result.isDarkMode;
  if (isDarkMode == undefined) {
    isDarkMode = false;
  }
  console.log("isDarkMode => " + isDarkMode);
});

// for popup/html
toggleDarkMode(isDarkMode);

const colorSwitch = document.getElementsByClassName("color-theme-switch")[0];

colorSwitch.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  chrome.storage.local.set({ isDarkMode: isDarkMode }, () => {
    console.log("isDarkMode => " + isDarkMode);
    toggleDarkMode(isDarkMode);
  });

  // popupからcontent_scriptsにメッセージを送信 +++++++++++++++++++
  // let tabId = await getTabId();
  // chrome.tabs.sendMessage(
  //     tabId: tabId,
  //     message: {"isDarkMode": isDarkMode},
  // );
  // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, {"isDarkMode": isDarkMode},
  //         console.log(response);
  //     });
});
