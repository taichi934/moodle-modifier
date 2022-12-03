import {
    initialDarkModeCheck,
    listenDarkModeChange,
} from './modules/checkDarkMode';
import { optimizeResponsive } from './modules/layout.js';
import { addWordCounter } from './modules/wordCount';

(() => {
    initialDarkModeCheck();
    listenDarkModeChange();

    window.addEventListener('DOMContentLoaded', () => {
        // optimizeResponsive(); // カレンダーが下に移動するまでの画面幅を広く設定
    });
    window.addEventListener('load', () => {
        // オンラインエディタは読み込み完了が遅いため
        addWordCounter(); // アンケート系のテキストエディタに文字数カウントを追加
    });
})();
