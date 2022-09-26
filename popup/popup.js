const changeSwitchText = (isDarkMode) => {
  const switchBtn = document.querySelector('.color-theme-switch');
  if (isDarkMode) {
    switchBtn.textContent = 'ダークテーマ';
  } else {
    switchBtn.textContent = 'ライトテーマ';
  }
};

const toggleDarkMode = (isDarkMode) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  changeSwitchText(isDarkMode);
};

let isDarkMode;
chrome.storage.local.get(['isDarkMode'], (result) => {
  // storageに値がなければundedinedを返す
  if (result.isDarkMode === undefined) {
    isDarkMode = false;
  } else {
    isDarkMode = result.isDarkMode;
  }
  toggleDarkMode(isDarkMode); // for switch in popup/html
});

const colorSwitch = document.getElementsByClassName('color-theme-switch')[0];

colorSwitch.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  chrome.storage.local.set({ isDarkMode: isDarkMode }, () => {
    console.log('isDarkMode => ' + isDarkMode);
    toggleDarkMode(isDarkMode); // for switch in popup/html
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
