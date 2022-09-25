const toggleDarkMode = (isDarkMode) => {
    if (isDarkMode) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    // document.documentElement.setAttribute('data-theme', storedTheme)
}

let isDarkMode;
chrome.storage.sync.get(["isDarkMode"], (result)=>{
    // storageに値がなければundedinedを返す
    if (isDarkMode == undefined) {
        isDark = false;
    }
    isDarkMode = result.isDarkMode;
    console.log("isDarkMode => " + isDarkMode);
});

toggleDarkMode(isDarkMode);

const colorSwitch = document.getElementsByClassName("color-theme-switch")[0];

colorSwitch.addEventListener("click", ()=>{
    isDarkMode = !isDarkMode;
    chrome.storage.sync.set({"isDarkMode": isDarkMode}, ()=>{
        console.log("isDarkMode => " + isDarkMode);
    });
    toggleDarkMode(isDarkMode);
});
