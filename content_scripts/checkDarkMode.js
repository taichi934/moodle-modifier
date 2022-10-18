(() => {
    let isDarkMode;
    chrome.storage.sync.get(['isDarkMode'], (items) => {
        isDarkMode = items.isDarkMode;
        if (isDarkMode === undefined) {
            isDarkMode = false;
        }
        toggleDarkMode(isDarkMode);
    });

    // popupでカラーテーマを変更したとき
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.isDarkMode === undefined) return;
        isDarkMode = changes.isDarkMode;
        console.log(
            'read storage at checkdarkMode.js -> ' + changes.isDarkMode
        );
        // isDarkMode <= {newValue: true, oldValue: false}
        toggleDarkMode(isDarkMode.newValue);
    });
})();

function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
