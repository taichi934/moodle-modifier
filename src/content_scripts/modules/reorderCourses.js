// storageからコースの並びを取得して、その順番に並び変える
export function sortCourses() {
    let order = [];
    chrome.storage.sync.get(['courseOrder'], (items) => {
        if (!items.courseOrder) return;
        order = items.courseOrder;
        // console.log('course order -> ' + order);

        // frontpage-course-listのコースだけ
        const courses = document.getElementsByClassName('courses')[0];

        // sort
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

export function setCoursesDraggable() {
    const courses = document.getElementsByClassName('coursebox');

    for (const course of courses) {
        // course.setAttribute('draggable', 'true');

        course.ondragstart = onDragStart;
        course.ondragover = onDragOver;
        course.ondragleave = onDragLeave;
        course.ondragend = onDragEnd;
        course.ondrop = onDrop;
    }
}

// ドラッグされて動く側
function onDragStart(event) {
    event.dataTransfer.setData(
        'text/plane',
        event.currentTarget.dataset.courseid
    );

    // event.currentTarget and this, means same
    event.currentTarget.style.opacity = 0.3;
}

// ドラッグされたもので覆われる側
function onDragOver(event) {
    event.preventDefault();

    // 編集モードじゃなくてもドラッグ可能なものは存在するから
    if (!event.currentTarget.draggable) return;

    // event.targetだと子要素がトリガーされる
    // イベントはdraggableまでバブリングする
    // バブリングしてトリガーされた現在の要素は event.currentTarget
    event.currentTarget.id = 'dragover';
}

// ドラッグされたもので覆われる側
function onDragLeave(event) {
    event.currentTarget.id = '';
}

// ドラッグされている側．捕まれてるもの
// 意味ないところにドロップされたとき用
function onDragEnd(event) {
    event.currentTarget.style.opacity = 1;
}

// dropされる，受けて側の処理
function onDrop(event) {
    event.preventDefault();

    // 編集モードじゃなくてもドラッグ可能なものは存在するから
    if (!event.currentTarget.draggable) return;

    const courseid = event.dataTransfer.getData('text/plane');
    const draggingCourse = document.querySelector(
        `div[data-courseid='${courseid}']`
    );
    draggingCourse.style.opacity = 1;

    const coveredCourse = event.currentTarget; // thisと同じ
    coveredCourse.parentNode.insertBefore(draggingCourse, coveredCourse);

    event.currentTarget.id = '';

    // コースの配色を更新
    remapOddEven();
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
