(() => {
  const main = () => {
    // iframeでカレンダーページを読み取り
    const calendarPage = document.createElement("iframe");
    calendarPage.src = "./calendar/view.php?view=month";
    calendarPage.style.display = "none";
    document.body.appendChild(calendarPage);

    // カレンダーを包む用のdiv
    const calendarDiv = document.createElement("div");
    calendarDiv.classList.add("calendar-table", "block", "card", "mb-3");

    calendarPage.addEventListener("load", () => {
      // iframeからカレンダーを取得
      const calendar = calendarPage.contentDocument.querySelector(
        "div.calendarwrapper"
      );
      calendarDiv.appendChild(calendar); // カレンダーをdivで包む

      const navRight = document.getElementById("block-region-side-pre");
      let links = navRight.children[2];
      navRight.insertBefore(calendarDiv, links);

      document.body.removeChild(calendarPage);
    });
  };

  window.addEventListener("DOMContentLoaded", () => {
    // 自動ログイン
    const loginLink = document.querySelector(".login");
    // ログイン済みの場合に動作
    if (loginLink == null) {
      main();
    }
  });
})();
