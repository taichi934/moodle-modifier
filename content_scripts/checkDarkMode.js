(() => {
    const toggleDarkMode = (isDarkMode) => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    let isDarkMode;
    browser.storage.local.get(['isDarkMode'], (items) => {
        isDarkMode = items.isDarkMode;
        if (isDarkMode === undefined) {
            isDarkMode = false;
        }
        toggleDarkMode(isDarkMode);
    });

    // popupでカラーテーマを変更したとき
    browser.storage.onChanged.addListener((changes) => {
        isDarkMode = changes.isDarkMode;
        // isDarkMode <= {newValue: true, oldValue: false}
        toggleDarkMode(isDarkMode.newValue);
    });
})();
