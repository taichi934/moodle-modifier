(() => {
    window.addEventListener('DOMContentLoaded', () => {
        sortCourses();
        setCoursesDraggable();
    });
})();

function sortCourses() {
    let order = [];
    chrome.storage.sync.get(['courseOrder'], (items) => {
        if (!items.courseOrder) return;
        order = items.courseOrder;
        console.log('course order -> ' + order);

        // frontpage-course-listのコースだけ
        const courses = document.getElementsByClassName('courses')[0];

        for (let i = 0; i < order.length; i++) {
            for (let j = i; j < courses.children.length; j++) {
                if (courses.children[j].dataset.courseid === order[i]) {
                    courses.insertBefore(
                        courses.children[j],
                        courses.children[i]
                    );
                }
            }
        }

        remapOddEven();
    });
}

function setCoursesDraggable() {
    const courses = document.getElementsByClassName('coursebox');

    for (const course of Array.from(courses)) {
        // course.setAttribute('draggable', 'true');

        course.ondragstart = onDragStart;
        course.ondragover = onDragOver;
        course.ondragleave = onDragLeave;
        course.ondrop = onDrop;
    }
}

// ドラッグされて動く側
function onDragStart(event) {
    event.dataTransfer.setData(
        'text/plane',
        event.currentTarget.dataset.courseid
    );

    // event.currentTarget and this means same
    event.currentTarget.style.opacity = 0.4;
}

// ドラッグされたもので覆われる側
function onDragOver(event) {
    event.preventDefault();

    // event.targetだと子要素がトリガーされる
    // イベントはdraggableまでバブリングする
    // バブリングしてトリガーされた現在の要素は event.currentTarget
    event.currentTarget.style.borderTop = '5px solid blue';
}

// ドラッグされたもので覆われる側
function onDragLeave(event) {
    event.currentTarget.style.borderTop = '';
}

// dropされる，受けて側の処理
function onDrop(event) {
    event.preventDefault();

    const courseid = event.dataTransfer.getData('text/plane');
    const draggingCourse = document.querySelector(
        `div[data-courseid='${courseid}']`
    );
    draggingCourse.style.opacity = 1;

    const coveredCourse = event.currentTarget; // thisと同じ
    coveredCourse.parentNode.insertBefore(draggingCourse, coveredCourse);
    coveredCourse.style.borderTop = '';

    // コースの配色を更新
    remapOddEven();

    // // 編集モード抜ける時の実装をするまでとりあえずここで呼び出す
    // saveCourseOrder();
}

// 非表示にしたりしたときにコースの背景連続しないように
function remapOddEven() {
    const courses = document.getElementsByClassName('coursebox');

    // .odd
    for (let i = 0; i < courses.length; i += 2) {
        courses[i].classList.remove('even');
        courses[i].classList.add('odd');
    }
    // .even
    for (let i = 1; i < courses.length; i += 2) {
        courses[i].classList.remove('odd');
        courses[i].classList.add('even');
    }
}

// // 編集モードを終える時に呼び出す
// function saveCourseOrder() {
//     let order = [];

//     // 表示してるコースだけ
//     const courses = document.querySelectorAll(
//         '#frontpage-course-list .coursebox'
//     );

//     // 並び順を配列に
//     for (const el of courses) {
//         order.push(el.dataset.courseid);
//     }

//     chrome.storage.sync.set({ courseOrder: order }, () => {
//         console.log('saveCourseOrder() : courseOrder -> ' + order);
//     });
// }
