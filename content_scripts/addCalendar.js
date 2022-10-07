(() => {
  const main = () => {
    const calendarPage = document.createElement("iframe");
    calendarPage.src = "./calendar/view.php?view=month";
    // calendarPage.style.display = "none";
    document.getElementById("page-wrapper").appendChild(calendarPage);

    // console.log(calendarPage.contentDocument.document);

    calendarPage.addEventListener("load", () => {
      console.log("hello from onLoad");
      console.log(calendarPage);
      console.log("contentWindow: " + calendarPage.contentWindow.document);
      console.log("contentDocument: " + calendarPage.contentDocument);

      const tableDiv = document.createElement("div");
      const calendar = calendarPage.contentWindow.document.querySelector(
        "div.calendarwrapper table"
      );
      tableDiv.classList.add("calendar-table", "block", "card", "mb-3");
      tableDiv.appendChild(calendar);
      console.log("calendar: " + calendar);
      // document.getElementById("page-wrapper").appendChild(calendar);

      const navRight = document.getElementById("block-region-side-pre");
      let links = navRight.children[2];
      navRight.insertBefore(tableDiv, links);

      document.getElementById("page-wrapper").removeChild(calendarPage);
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
// トップページ：   https://moodle2022.wakayama-u.ac.jp/2022/
// カレンダーページ：https://moodle2022.wakayama-u.ac.jp/2022/calendar/view.php?view=month

/* <script type="text/javascript">

var iframe = document.createElement("iframe");
iframe.src = "./ex1.html";
iframe.style.display = "none";
document.body.appendChild( iframe );

iframe.onload = function(){

var a = iframe.contentWindow.document.getElementsByTagName("a")[ 0 ];

document.getElementsByTagName("h1")[ 0 ].innerHTML = a.outerHTML;

document.body.removeChild( iframe );

};

</script> */
