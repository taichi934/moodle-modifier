import {
    initialDarkModeCheck,
    listenDarkModeChange,
} from './modules/checkDarkMode.js';
import {
    checkLogin,
    changeLayout,
    optimizeResponsive,
} from './modules/layout.js';
import { showCalendar } from './modules/calendar.js';
import {
    insertBackTransLogo,
    switchLogoWhenDarkModeChanges,
} from './modules/switchLogo.js';

(() => {
    const transLogo = chrome.runtime.getURL(
        'src/images/wadai-logo-trans-complete.png'
    );

    initialDarkModeCheck();
    listenDarkModeChange();

    window.addEventListener('DOMContentLoaded', () => {
        insertBackTransLogo(transLogo); // 画像のちらつきを防げる
        checkLogin();
        changeLayout();
        optimizeResponsive(); // カレンダーが下に移動するまでの画面幅を広く設定

        showCalendar();

        switchLogoWhenDarkModeChanges();
    });
})();
