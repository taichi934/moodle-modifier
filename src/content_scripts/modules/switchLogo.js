let isDarkMode;

// 初めに背景透過の写真にすることでダークモード時のちらつきをなくせる
export function insertBackTransLogo(image) {
    const img = document.querySelector('.logo .img-fluid');
    img.src = image;
    // img.src = chrome.runtime.getURL('src/images/wadai-logo-trans-complete.png');
}

export function switchLogoWhenDarkModeChanges() {
    // popupでカラーテーマを変更したとき
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.isDarkMode === undefined) return;
        isDarkMode = changes.isDarkMode;
        changeLogo(isDarkMode.newValue);
    });
}

// Change wadai logo image on top of right nav
function changeLogo(isDarkMode) {
    const img = document.querySelector('.logo .img-fluid');
    if (isDarkMode) {
        img.src = chrome.runtime.getURL(
            'src/images/wadai-logo-trans-complete.png'
        );
    } else {
        img.src = chrome.runtime.getURL('src/images/wadai-logo.png');
    }
}
