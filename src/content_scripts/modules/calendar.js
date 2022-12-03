export function showCalendar() {
    // iframeでカレンダーページを読み取り
    const calendarPage = document.createElement('iframe');
    calendarPage.src = './calendar/view.php?view=month';
    calendarPage.style.display = 'none';
    document.body.appendChild(calendarPage);

    // カレンダーを包む用のdiv
    const calendarDiv = document.createElement('div');
    calendarDiv.classList.add('calendar-table', 'block', 'card', 'mb-3');

    insertDummy();

    calendarPage.addEventListener('load', () => {
        // iframeからカレンダーを取得
        const calendar = calendarPage.contentDocument.querySelector(
            'div.calendarwrapper'
        );
        calendarDiv.appendChild(calendar); // カレンダーをdiv(calendarDiv)で包む

        const navRight = document.getElementById('block-region-side-pre');
        // 仮置きのカレンダーを削除
        document.getElementsByClassName('dummy')[0].remove();
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

// 空のカレンダーを仮置き
function insertDummy() {
    const dummy = document.createElement('div');
    dummy.classList.add('dummy', 'calendar-table', 'block', 'card', 'mb-3');

    const year = getYearOrMonth('year');
    const month = getYearOrMonth('month');

    dummy.innerHTML = `
        <div class="controls">
            <div class="calendar-controls">
                <h2 class="current">${year}年 ${month}月</h2>
            </div>
        </div>
        <table class="calendarmonth calendartable mb-0">
            <thead>
                <tr>
                    <th class="header text-xs-center">
                        <span class="sr-only">日曜日</span>
                        <span aria-hidden="true">日</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">月曜日</span>
                        <span aria-hidden="true">月</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">火曜日</span>
                        <span aria-hidden="true">火</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">水曜日</span>
                        <span aria-hidden="true">水</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">木曜日</span>
                        <span aria-hidden="true">木</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">金曜日</span>
                        <span aria-hidden="true">金</span>
                    </th>
                    <th class="header text-xs-center">
                        <span class="sr-only">土曜日</span>
                        <span aria-hidden="true">土</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr data-region="month-view-week">
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                </tr>
                <tr data-region="month-view-week">
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                </tr>
                <tr data-region="month-view-week">
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                </tr>
                <tr data-region="month-view-week">
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                </tr>
                <tr data-region="month-view-week">
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                    <td class="dayblank">&nbsp;</td>
                </tr>

            </tbody>
        </table>
    `;

    const navRight = document.getElementById('block-region-side-pre');
    let links = navRight.children[2];
    navRight.insertBefore(dummy, links);
}

function getYearOrMonth(cond) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    if (cond === 'year') {
        return year;
    } else if ('month') {
        return month + 1;
    }
}
