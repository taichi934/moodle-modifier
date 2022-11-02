(() => {
    let isDarkMode;

    // popupでカラーテーマを変更したとき
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.isDarkMode === undefined) return;
        isDarkMode = changes.isDarkMode;
        changeLogo(isDarkMode.newValue);
    });
})();

// Change wadai logo image on top of right nav
function changeLogo(isDarkMode) {
    const img = document.querySelector('.logo .img-fluid');
    if (isDarkMode) {
        img.src = chrome.runtime.getURL('images/wadai-logo-trans-complete.png');
    } else {
        img.src = chrome.runtime.getURL('images/wadai-logo.png');
    }
}
