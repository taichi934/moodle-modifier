import {
    initialDarkModeCheck,
    listenDarkModeChange,
} from './modules/checkDarkMode';
import { addWordCounter } from './modules/wordCount';

(() => {
    initialDarkModeCheck();
    listenDarkModeChange();

    window.addEventListener('load', () => {
        // オンラインエディタは読み込み完了が遅いため
        addWordCounter(); // アンケート系のテキストエディタに文字数カウントを追加
    });
})();
