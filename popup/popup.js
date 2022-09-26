const toggleDarkMode = (isDarkMode, colorSwitch) => {
  if (isDarkMode) {
    document.documentElement.classList.add('dark');
    colorSwitch.checked = true;
  } else {
    document.documentElement.classList.remove('dark');
    colorSwitch.checked = false;
  }
  // changeSwitchText(isDarkMode);
};

let isDarkMode;

chrome.storage.local.get(['isDarkMode'], (result) => {
  // storageに値がなければundedinedを返す
  if (result.isDarkMode === undefined) {
    isDarkMode = false;
  } else {
    isDarkMode = result.isDarkMode;
  }
  toggleDarkMode(isDarkMode, colorSwitch); // for switch in popup/html
});

// const colorSwitch = document.getElementsByClassName('switch')[0];
const colorSwitch = document.querySelector(`input[type = 'checkbox']`);

colorSwitch.addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  chrome.storage.local.set({ isDarkMode: isDarkMode }, () => {
    toggleDarkMode(isDarkMode, colorSwitch); // for switch in popup/html
  });
});
