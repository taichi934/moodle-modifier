export function changeFormat(): void {
    changeWeekFormat();

    // 最終日が日曜日の場合，行を追加
    const endDay = getEndDay();
    if (endDay === 0) {
        appendRow();
    }

    // 日曜日の列を一番左に移動
    const rows: HTMLCollectionOf<HTMLTableRowElement> =
        document.getElementsByTagName('tr'); // 1つ目は thead>tr
    let sun: HTMLTableCellElement;
    for (let i = 0; i < rows.length; i++) {
        if (i === 0) {
            continue;
        } else if (i === 1) {
            sun = rows[i]!.children[6] as HTMLTableCellElement;
        } else {
            sun = rows[i]!.children[7] as HTMLTableCellElement;
        }
        // i===row.length-1の時は次の行がないので実行されない
        rows[i + 1]?.insertBefore(sun, rows[i + 1]?.firstElementChild!);
    }

    // 何曜日スタートか
    const startDayOfWeek = getDay();
    if (startDayOfWeek === 0) {
        // 日曜日スタート
        // 何も無くなった1行目を削除
        rows[1]?.remove();
    } else {
        // 1日が月から土までの間だったら，1行目の先頭に空の日にち（&nbsp;）を追加
        const emptyDate: HTMLTableCellElement = document.createElement('td');
        emptyDate.classList.add('dayblank');
        emptyDate.innerHTML = '&nbsp;';
        rows[1]!.insertBefore(emptyDate, rows[1]?.firstElementChild!);
    }

    // 最終行が8マスになるから
    removeLastCell(rows[rows.length - 1]!);
}

function changeWeekFormat(): void {
    const weeks = document.querySelector<HTMLTableRowElement>('thead > tr');
    weeks?.insertBefore(weeks.lastElementChild!, weeks.firstElementChild);
}

function appendRow(): void {
    const endRow = document.querySelector('table')?.insertRow();
    endRow!.innerHTML = `<td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td><td class="dayblank">&nbsp;</td>`;
}

// 返り値 → 0~6 : 日~土
function getDay(): number {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    const day = new Date(year, month, 1);
    return day.getDay();
}

// 8個の要素を持つ配列の最後の要素を削除
function removeLastCell(row: HTMLTableRowElement): void {
    row.lastElementChild?.remove();
}

// 最終日の曜日を取得
// 返り値 → 0~6 : 日~土
function getEndDay(): number {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth(); // 月だけ0ベース
    const endDay = new Date(year, month + 1, 0).getDay();
    return endDay;
}
