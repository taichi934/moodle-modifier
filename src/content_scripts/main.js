import { initialDarkModeCheck, listenDarkModeChange } from './checkDarkMode.js';
import { checkLogin, changeLayout, optimizeResponsive } from './layout.js';
import { showCalendar } from './calendar.js';
import {
    insertBackTransLogo,
    switchLogoWhenDarkModeChanges,
} from './switchLogo.js';

(() => {
    initialDarkModeCheck();
    listenDarkModeChange();

    window.addEventListener('DOMContentLoaded', () => {
        insertBackTransLogo(); // 画像のちらつきを防げる
        checkLogin();
        changeLayout();
        optimizeResponsive(); // カレンダーが下に移動するまでの画面幅を広く設定

        showCalendar();

        // switchLogoWhenDarkModeChanges();
    });
})();
