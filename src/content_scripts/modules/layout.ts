// ログインされていなかったらログインする
export function checkLogin(): void {
    // 自動ログイン
    const loginLink = document.querySelector('.login');
    // ログインのリンクがある場合
    if (loginLink != null) {
        //click login link
        const hrefUrl = (loginLink.children[0] as HTMLAnchorElement).href;
        location.assign(hrefUrl);

        // login process continues on login.js
    }
}

export function changeLayout(): void {
    // コースを上に表示
    const parentDiv =
        document.querySelector<HTMLDivElement>("div[role = 'main']");
    if (parentDiv) {
        parentDiv.insertBefore(parentDiv.children[5]!, parentDiv.children[1]!);
        parentDiv.insertBefore(parentDiv.children[2]!, parentDiv.children[6]!);
    }

    // header(大学名)を右のナビゲーションの最上部に表示
    const navRight = document.getElementById('block-region-side-post');
    const header = document.getElementsByClassName(
        'card'
    )[0] as HTMLElement | null;

    if (!navRight || !header || !navRight.children[0]) return;
    header.style.marginBottom = '1rem';
    navRight.insertBefore(header, navRight.children[0]);

    // リンク集を上に
    let links = navRight.children[6];
    // 2022年度版ではリンクじゃない場所に挿入されるから、確認してから挿入
    if (links?.children[0]?.children[0]?.innerHTML === 'リンク') {
        const myCourses = navRight.children[3]; // header画像がchildren[1] (div.card)

        // 右コラムのリンクとマイコースの位置を入れ替え、リンクを上に
        if (links && myCourses) {
            navRight.insertBefore(links, myCourses);
        }

        // リンク集の中に図書館OPACへのリンクを教育サポートシステムの下に配置
        const opacLink = document.createElement('p');
        // opacLink.innerHTML = `<a href="https://opac.center.wakayama-u.ac.jp/opac/opac_search/?lang=0" target="_blank">和歌山大学図書館OPAC</a>`;
        opacLink.innerHTML = `<a href="https://opac.center.wakayama-u.ac.jp/opac/opac_search/">和歌山大学図書館OPAC</a>`;
        // リンク集が余分なdivに囲まれてるから取り除く
        links = links?.children[0]?.children[1]?.children[0];
        links?.insertBefore(opacLink, links.children[1]!);

        // 左セクションのナビゲーションを右セクションのマイコースの上に移動する
        const navigation = document.getElementsByClassName(
            'block_navigation'
        )[0] as HTMLElement | null;
        if (navigation)
            navRight.insertBefore(navigation, navRight.children[4]!);
    }
}

// カレンダーが下に移動するまでの画面幅を広く設定
export function optimizeResponsive(): void {
    // 2023年版までの場合
    if (
        location.hostname == 'moodle2023.wakayama-u.ca.jp' ||
        location.hostname == 'moodle2022.wakayama-u.ca.jp'
    ) {
        const mainBox = document.getElementById('region-main-box');
        if (mainBox) {
            // rowとかの場所を再調整
            mainBox.classList.add('row');
            mainBox.classList.remove('col-12');
            (mainBox.parentNode as HTMLElement).classList.remove('row');

            mainBox.children[0]?.classList.add('col-md-8'); // mycourse section
            mainBox.children[1]?.classList.add('col-md-4'); // rightNav section
        }
        return;
    } else {
        // 2024年版以降の場合
        const pageContent = document.getElementById('page-content');
        if (pageContent) {
            pageContent.children[0]?.classList.remove('region-main');
            pageContent.children[1]?.classList.remove('columnleft'); // left column
            pageContent.children[2]?.classList.remove('columnright');
        }
    }
}
