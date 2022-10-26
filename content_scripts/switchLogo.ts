(() => {
    window.addEventListener('DOMContentLoaded', () => {
        // Change wadai logo image on top of right nav
        const changeLogo = (isDarkMode) => {
            const img = document.querySelector('.logo img');
            if (isDarkMode) {
                img.src = chrome.runtime.getURL(
                    'images/wadai-logo-trans-complete.png'
                );
            } else {
                img.src = chrome.runtime.getURL('images/wadai-logo.png');
            }
        };

        let isDarkMode;
        chrome.storage.sync.get(['isDarkMode'], (items) => {
            isDarkMode = items.isDarkMode;
            if (isDarkMode === undefined) {
                isDarkMode = false;
            }
            changeLogo(isDarkMode);
        });

        // popupでカラーテーマを変更したとき
        chrome.storage.onChanged.addListener((changes) => {
            if (changes.isDarkMode === undefined) return;

            isDarkMode = changes.isDarkMode;
            changeLogo(isDarkMode.newValue);
        });
    });
})();
