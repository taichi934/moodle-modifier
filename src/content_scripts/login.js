import {
    initialDarkModeCheck,
    listenDarkModeChange,
} from './modules/checkDarkMode.js';

function everythingHidden() {
    const body = document.querySelector('body');
    for (const el of Array.from(body.children)) {
        if ('script' in el) continue;
        el.style.display = 'none';
    }
}

(() => {
    // Color Theme
    initialDarkModeCheck();
    listenDarkModeChange();

    // login process
    window.addEventListener('DOMContentLoaded', () => {
        // if you login for the first time, you need to login by <your college> id manually

        // in other cases, you just push a login button
        // this code just do that automatically
        const a = document.getElementsByClassName(
            'btn btn-lg btn-block btn-warning'
        )[0];
        const url = a.href;

        // 要素を全て非表示にする（ボタンとかがチラつくよりもマシ）
        everythingHidden();

        location.assign(url);
    });
})();
