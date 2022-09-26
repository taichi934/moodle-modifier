// 無名関数を定義して呼び出すのが定例っぽい
(() => {
  // 自動ログイン
  const loginLink = document.querySelector('.login');
  // ログインのリンクがある場合
  if (loginLink != null) {
    //click login link
    const hrefUrl = loginLink.children[0].href;
    location.assign(hrefUrl);

    // login process continues on loginByCollegeID.js
  }

  // コースを上に表示
  const parentDiv = document.querySelector("div[role = 'main']");
  parentDiv.insertBefore(parentDiv.children[5], parentDiv.children[1]);
  parentDiv.insertBefore(parentDiv.children[2], parentDiv.children[6]);
  console.log(parentDiv.children);

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
})();
