import {
    initialDarkModeCheck,
    listenDarkModeChange,
} from './modules/checkDarkMode';
import { checkLogin, changeLayout, optimizeResponsive } from './modules/layout';
import { showCalendar } from './modules/calendar';
import { changeFormat } from './modules/formatCalendar';
import {
    insertBackTransLogo,
    switchLogoWhenDarkModeChanges,
} from './modules/switchLogo';

// page headerの大学名をテキストではなく、ロゴの画像に入れ替える
function modifyPageHeader(transLogoURL: string): void {
    const univ_logo_parent = document.querySelector('#page-header .mr-auto');
    if (univ_logo_parent)
        univ_logo_parent.innerHTML = `<div class="logo"><img class="img-fluid" src="${transLogoURL}" alt="和歌山大学Moodleのロゴ"></div>`;
}

(() => {
    const transLogo = chrome.runtime.getURL(
        'src/images/wadai-logo-trans-complete.png'
    );

    initialDarkModeCheck();
    listenDarkModeChange();

    window.addEventListener('DOMContentLoaded', () => {
        // 2024年版はロゴが画像じゃなくなり、HTMLが変更されているため、従来と同じHTML構造に修正する
        if (location.hostname === 'moodle2024.wakayama-u.ac.jp')
            modifyPageHeader(transLogo);

        insertBackTransLogo(transLogo); // 画像のちらつきを防げる
        checkLogin();
        changeLayout();
        optimizeResponsive(); // カレンダーが下に移動するまでの画面幅を広く設定

        showCalendar();

        switchLogoWhenDarkModeChanges();
    });
    window.addEventListener('load', () => {
        changeFormat();
    });
})();
