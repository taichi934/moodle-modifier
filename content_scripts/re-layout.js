// 無名関数を定義して呼び出すのが定例っぽい
(() => {
  // 自動ログイン
  const loginLink = document.querySelector(".login");
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

  // CampusSquareなどのリンクを上に
  const navRight = document.getElementById("block-region-side-pre");
  navRight.insertBefore(navRight.children[7], navRight.children[1]);

  // header画像を右のナビゲーションの最上部に表示
  const header = document.getElementsByClassName("card")[0];
  header.style.marginBottom = "1rem";
  navRight.insertBefore(header, navRight.children[1]);
})();
