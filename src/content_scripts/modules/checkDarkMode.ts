let isDarkMode: boolean;

export function initialDarkModeCheck(): void {
    chrome.storage.sync.get(['isDarkMode'], (items) => {
        isDarkMode = items.isDarkMode;
        if (isDarkMode === undefined) {
            isDarkMode = false;
        }
        toggleDarkMode(isDarkMode);
    });
}

export function listenDarkModeChange(): void {
    // popupでカラーテーマを変更したとき
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.isDarkMode === undefined) return;

        // changes.isDarkMode <= {newValue: true, oldValue: false}
        isDarkMode = changes.isDarkMode.newValue;
        toggleDarkMode(isDarkMode);
    });
}

function toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}
