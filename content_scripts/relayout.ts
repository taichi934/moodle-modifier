// 無名関数を定義して呼び出すのが定例っぽい
(() => {
    window.addEventListener('DOMContentLoaded', () => {
        // 自動ログイン
        const loginLink =
            document.querySelector<HTMLAnchorElement>('.login > a');
        // ログインのリンクがある場合
        if (loginLink != null) {
            //click login link
            const hrefUrl: any = loginLink?.href;
            location.assign(hrefUrl);

            // login process continues on loginByCollegeID.js
        }

        // コースを上に表示
        const parentDiv =
            document.querySelector<HTMLElement>("div[role = 'main']");
        if (parentDiv != null) {
            parentDiv.insertBefore(
                parentDiv.children[5] as Node,
                parentDiv.children[1] as Node
            );
            parentDiv.insertBefore(
                parentDiv.children[2] as Node,
                parentDiv.children[6] as Node
            );
        }

        // header画像を右のナビゲーションの最上部に表示
        const navRight = document.getElementById('block-region-side-pre');
        if (navRight === null) return;
        const header: any = document.getElementsByClassName('card')[0];
        header.style.marginBottom = '1rem';
        navRight.insertBefore(header, navRight.children[1] as Node);

        // リンク集を上に
        let links = navRight.children[8];
        const myCourses = navRight.children[2];
        navRight.insertBefore(links as Node, myCourses as Node);

        // リンク集の中に図書館OPACへのリンクを教育サポートシステムの下に配置
        const opacLink = document.createElement('p');
        opacLink.innerHTML = `<a href="https://opac.center.wakayama-u.ac.jp/opac/opac_search/?lang=0" target="_blank">和歌山大学図書館OPAC</a>`;

        // リンク集が余分なdivに囲まれてるから取り除く
        links = navRight.children[2]?.children[0]?.children[1]?.children[0];
        links?.insertBefore(opacLink, links.children[1] as Node);
    });
})();
