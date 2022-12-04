let isDarkMode: boolean;

// 初めに背景透過の写真にすることでダークモード時のちらつきをなくせる
export function insertBackTransLogo(image: string): void {
    const img = document.querySelector<HTMLImageElement>('.logo .img-fluid');
    if (img) {
        img.src = image;
    }
    // img.src = chrome.runtime.getURL('src/images/wadai-logo-trans-complete.png');
}

export function switchLogoWhenDarkModeChanges(): void {
    // popupでカラーテーマを変更したとき
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.isDarkMode === undefined) return;
        isDarkMode = changes.isDarkMode.newValue;
        changeLogo(isDarkMode);
    });
}

// Change wadai logo image on top of right nav
function changeLogo(isDarkMode: boolean): void {
    const img = document.querySelector<HTMLImageElement>('.logo .img-fluid');
    if (!img) return;

    if (isDarkMode) {
        img.src = chrome.runtime.getURL(
            'src/images/wadai-logo-trans-complete.png'
        );
    } else {
        img.src = chrome.runtime.getURL('src/images/wadai-logo.png');
    }
}
