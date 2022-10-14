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
      calendarDiv.appendChild(calendar); // カレンダーをdiv(calendarDiv)で包む

      const navRight = document.getElementById("block-region-side-pre");
      let links = navRight.children[2];
      navRight.insertBefore(calendarDiv, links);

      markToday();

      document.body.removeChild(calendarPage);
    });
  };

  const markToday = () => {
    const todayTimestamp = getUnixTimestamp();
    const todaySpan = document.querySelector(
      `table td[data-day-timestamp="${todayTimestamp}"] span:last-child`
    );
    todaySpan.classList.add("todaySpan");
  };

  const getUnixTimestamp = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    const date = d.getDate();
    const Unixtime = new Date(year, month, date);
    const timestamp = Unixtime.getTime() / 1000; // 単位がmsだから1000で割る
    return timestamp;
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
