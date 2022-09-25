(()=>{
    const isDarkMode = chrome.storage.sync.get(["isDarkMode"]);
    const tabId = getTabId();
    if (isDarkMode === true) {
        chrome.scripting.insertCSS(
            {
                target: {tabId: tabId},
                files: ["../css/darMode.css"],
            }
        );
    }
})();
