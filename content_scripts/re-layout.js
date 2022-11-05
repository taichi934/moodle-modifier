// 無名関数を定義して呼び出すのが定例っぽい
(() => {
    window.addEventListener('DOMContentLoaded', () => {
        insertBackTransLogo(); // 画像のちらつきを防げる

        // 自動ログイン
        const loginLink = document.querySelector('.login');
        // ログインのリンクがある場合
        if (loginLink != null) {
            //click login link
            const hrefUrl = loginLink.children[0].href;
            location.assign(hrefUrl);

            // login process continues on login.js
        }

        // コースを上に表示
        const parentDiv = document.querySelector("div[role = 'main']");
        parentDiv.insertBefore(parentDiv.children[5], parentDiv.children[1]);
        parentDiv.insertBefore(parentDiv.children[2], parentDiv.children[6]);

        // header画像を右のナビゲーションの最上部に表示
        const navRight = document.getElementById('block-region-side-pre');
        const header = document.getElementsByClassName('card')[0];
        header.style.marginBottom = '1rem';
        navRight.insertBefore(header, navRight.children[1]);

        // リンク集を上に
        let links = navRight.children[8];
        const myCourses = navRight.children[2];
        navRight.insertBefore(links, myCourses);

        // リンク集の中に図書館OPACへのリンクを教育サポートシステムの下に配置
        const opacLink = document.createElement('p');
        opacLink.innerHTML = `<a href="https://opac.center.wakayama-u.ac.jp/opac/opac_search/?lang=0" target="_blank">和歌山大学図書館OPAC</a>`;

        // リンク集が余分なdivに囲まれてるから取り除く
        links = navRight.children[2].children[0].children[1].children[0];
        links.insertBefore(opacLink, links.children[1]);

        // カレンダーが下に移動するまでの画面幅を広く設定
        optimizeResponsive();
    });
})();

// 初めに背景透過の写真にすることでダークモード時のちらつきをなくせる
function insertBackTransLogo() {
    const img = document.querySelector('.logo .img-fluid');
    img.src = chrome.runtime.getURL('images/wadai-logo-trans-complete.png');
}

// カレンダーが下に移動するまでの画面幅を広く設定
function optimizeResponsive() {
    const mainBox = document.getElementById('region-main-box');
    // rowとかの場所を再調整
    mainBox.classList.add('row');
    mainBox.classList.remove('col-12');
    mainBox.parentNode.classList.remove('row');

    mainBox.children[0].classList.add('col-md-8'); // mycourse section
    mainBox.children[1].classList.add('col-md-4'); // rightNav section
}
