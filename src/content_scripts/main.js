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
import { changeFormat } from './modules/formatCalendar.ts';
import {
    insertBackTransLogo,
    switchLogoWhenDarkModeChanges,
} from './modules/switchLogo.js';
import { addWordCounter } from './modules/wordCount.ts';

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
    window.addEventListener('load', () => {
        // オンラインエディタは読み込み完了が遅いため
        addWordCounter(); // アンケート系のテキストエディタに文字数カウントを追加

        changeFormat();
    });
})();
