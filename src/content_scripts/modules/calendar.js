export function showCalendar() {
    // iframeでカレンダーページを読み取り
    const calendarPage = document.createElement('iframe');
    calendarPage.src = './calendar/view.php?view=month';
    calendarPage.style.display = 'none';
    document.body.appendChild(calendarPage);

    // カレンダーを包む用のdiv
    const calendarDiv = document.createElement('div');
    calendarDiv.classList.add('calendar-table', 'block', 'card', 'mb-3');

    calendarPage.addEventListener('load', () => {
        // iframeからカレンダーを取得
        const calendar = calendarPage.contentDocument.querySelector(
            'div.calendarwrapper'
        );
        calendarDiv.appendChild(calendar); // カレンダーをdiv(calendarDiv)で包む

        const navRight = document.getElementById('block-region-side-pre');
        let links = navRight.children[2];
        navRight.insertBefore(calendarDiv, links);

        markToday();

        document.body.removeChild(calendarPage);
    });
}

function markToday() {
    const todayTimestamp = getUnixTimestamp();
    const todaySpanOrA = document.querySelector(
        `table td[data-day-timestamp="${todayTimestamp}"] > div`
    );
    todaySpanOrA.children[1].classList.add('todaySpan');
    // todaySpan.classList.add("todaySpan");
}

function getUnixTimestamp() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    const date = d.getDate();
    const Unixtime = new Date(year, month, date);
    const timestamp = Unixtime.getTime() / 1000; // 単位がmsだから1000で割る
    return timestamp;
}

function changeFormat(calendar) {
    const table = calendar.lastChild;
    const weeks = table.children[0].children[0]; // <tr>の配列
    weeks.insertBefore(weeks.lastChild, weeks.firstChild); // 曜日を入れ替え

    // 1日が月から土までの間だったら，1行目の先頭にからの日にち（&nbsp;）を追加し，
    // 日曜の列を2行目から追加

    // 1日が日曜日だったら，日曜の列を2行目から追加し，
    // 何も無くなった1行目を削除
}
