const toggleDarkMode = (isDarkMode, colorSwitch, modeText) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    colorSwitch.checked = true;
    modeText.textContent = 'ダークモード🌓';
  } else {
    document.documentElement.classList.remove('dark');
    colorSwitch.checked = false;
    modeText.textContent = 'ライトモード🌓';
  }
};

let isDarkMode;
const modeText = document.getElementById('mode-text');

chrome.storage.local.get(['isDarkMode'], (result) => {
  // storageに値がなければundedinedを返す
  if (result.isDarkMode === undefined) {
    isDarkMode = false;
  } else {
    isDarkMode = result.isDarkMode;
  }
  toggleDarkMode(isDarkMode, colorSwitch, modeText); // for switch in popup/html
});

// const colorSwitch = document.getElementsByClassName('switch')[0];
const colorSwitch = document.querySelector(`input[type = 'checkbox']`);

colorSwitch.addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  chrome.storage.local.set({ isDarkMode: isDarkMode }, () => {
    toggleDarkMode(isDarkMode, colorSwitch, modeText); // for switch in popup/html
  });
});
