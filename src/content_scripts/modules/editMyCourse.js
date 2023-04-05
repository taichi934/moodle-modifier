let removedCourses = [];

// デバッグ時にstorageを全消去する用
// async function deleteRemovedCoursesInStorage() {
//     await chrome.storage.sync.clear();
// }

export function makeDisapperedCourseList() {
    const disappearedCourseList = document.createElement('div');
    disappearedCourseList.id = 'display-off-course-list';
    disappearedCourseList.innerHTML =
        '<h2>マイコース<span>（非表示）</span></h2><div class="courses frontpage-course-list-enrolled"></div>';

    disappearedCourseList.style.display = 'none';

    const myCourse = document.getElementById('frontpage-course-list');
    myCourse.insertAdjacentElement('afterend', disappearedCourseList);
}

export function removeDisplayOffCourses() {
    chrome.storage.sync.get(['removedCourses'], (items) => {
        removedCourses = items.removedCourses;
        // console.log(
        //     'courseids of removedCourses from Storage -> ' + removedCourses
        // );

        if (!removedCourses) {
            removedCourses = [];
            return;
        }

        let courses = document.getElementsByClassName('coursebox');
        const disappearedCourseList = document.getElementById(
            'display-off-course-list'
        );

        for (const id of removedCourses) {
            Array.from(courses).forEach((c) => {
                let cid = c.dataset.courseid;
                if (id === cid) {
                    moveCourseTo(c, disappearedCourseList);
                    c.children[0].textContent = '表示';
                }
            });
        }

        remapOddEven();
    });
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

export function addEditMode() {
    // マイコース用
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn', 'btn');
    editBtn.setAttribute('type', 'button');
    editBtn.textContent = '編集';
    editBtn.addEventListener('click', (event) => {
        showDisplayOnOffButton(event);
        toggleDraggable(event); // 編集モードでのみコースの並び替え可
    });

    const btnsWrapper = document.createElement('div');
    btnsWrapper.className = 'btns-wrapper';
    btnsWrapper.prepend(editBtn);

    const myCourse = document.getElementById('frontpage-course-list');
    myCourse.insertBefore(btnsWrapper, myCourse.children[1]);

    // マイコース（非表示用）
    const sameBtnsWrapper = btnsWrapper.cloneNode(true);
    sameBtnsWrapper.children[0].addEventListener('click', (event) => {
        showDisplayOnOffButton(event);
        toggleDraggable(event); // 編集モードでのみコースの並び替え可
    });
    const disappearedCourseList = document.getElementById(
        'display-off-course-list'
    );
    disappearedCourseList.insertBefore(
        sameBtnsWrapper,
        disappearedCourseList.children[1]
    );
}

function showDisplayOnOffButton(event) {
    event.target.textContent =
        event.target.textContent === '編集' ? '完了' : '編集';
    const btns = document.getElementsByClassName('display-off');
    for (const el of btns) {
        el.classList.toggle('edit-mode');
    }
    const titles = document.querySelectorAll('.coursebox > .info');
    const teacherLists = document.querySelectorAll(
        '.coursebox > .content > .teachers'
    );
    for (const el of titles) {
        el.classList.toggle('edit-mode'); // cssで要素の位置をずらしてる
    }
    for (const el of teacherLists) {
        el.classList.toggle('edit-mode'); // cssで要素の位置をずらしてる
    }
}

function toggleDraggable(event) {
    const courses = document.getElementsByClassName('coursebox');

    const isEditMode = courses[0].draggable;

    for (const course of courses) {
        if (course.draggable) {
            // 編集モードを抜ける
            course.setAttribute('draggable', 'false');
        } else {
            // コースリスト切り替えボタンでもこの関数が呼び出されるから、
            // 編集ボタンを押した場合だけ編集モードに入る
            if (
                // 先にshowDisplayOnOffButton()が呼ばれるからボタンのテキストは逆になってる
                event.target.textContent === '完了'
            ) {
                course.setAttribute('draggable', 'true');
            }
        }
    }
    //　編集モードを抜ける時だけ実行
    if (isEditMode) saveCourseOrder();
}

// 編集モードを終える時に呼び出す
function saveCourseOrder() {
    let order = [];

    // 表示してるコースだけ
    const courses = document.querySelectorAll(
        '#frontpage-course-list .coursebox'
    );

    // 並び順を配列に
    for (const el of courses) {
        order.push(el.dataset.courseid);
    }

    chrome.storage.sync.set({ courseOrder: order }, () => {
        // console.log('saveCourseOrder() : courseOrder -> ' + order);
    });
}

export function addDisplayOnOffButton() {
    const myCourseList = document.getElementById('frontpage-course-list');
    const disappearedCourseList = document.getElementById(
        'display-off-course-list'
    );
    const courses = document.getElementsByClassName('coursebox');

    Array.from(courses).forEach((c) => {
        const btn = document.createElement('button');
        btn.classList.add('display-off');
        btn.setAttribute('type', 'button');
        btn.textContent = '非表示';

        btn.addEventListener('click', () => {
            if (btn.textContent === '非表示') {
                moveCourseTo(c, disappearedCourseList);
                btn.textContent = '表示';

                saveCourseid(c);
            } else {
                moveCourseTo(c, myCourseList);
                btn.textContent = '非表示';
                removeIdFromStorage(c.dataset.courseid);
            }
            // マイコースのoddとevenのクラスを更新処理
            remapOddEven();
        });

        c.prepend(btn);
    });
}

function moveCourseTo(course, des) {
    course.style.display = 'none';
    if (des.id === 'display-off-course-list') {
        des.children[2].insertBefore(course, null);
    } else {
        des.children[2].insertBefore(course, des.children[2].lastChild);
    }
}

// コースを非表示にした際にcourseidを記録
function saveCourseid(course) {
    removedCourses.push(course.dataset.courseid);
    chrome.storage.sync.set({ removedCourses: removedCourses }, () => {
        // console.log('saveCourseid() : removedCourseid -> ' + removedCourses);
    });
}

// マイコースと非表示にしたコースリストの切り替え
export function addCourseListToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'course-list-toggle-btn btn';
    btn.setAttribute('type', 'button');
    btn.textContent = '非表示のコースリスト';

    const myCourse = document.getElementById('frontpage-course-list');
    const disappearedCourseList = document.getElementById(
        'display-off-course-list'
    );

    function toggle(event) {
        let isDisplayOff = myCourse.style.display === 'none';
        if (isDisplayOff) {
            myCourse.style.display = 'block';
            disappearedCourseList.style.display = 'none';
            event.target.textContent = 'コースリスト';
        } else {
            myCourse.style.display = 'none';
            disappearedCourseList.style.display = 'block';
            event.target.textContent = '非表示のコースリスト';
        }

        const courses = document.getElementsByClassName('coursebox');
        Array.from(courses).forEach((c) => {
            c.style.display = 'block';
            // コースリストを切り替えるときは編集モードをオフ
            c.children[1].classList.remove('edit-mode');
        });

        // 編集中にリストを切り替えたとき用
        const editBtns = document.getElementsByClassName('edit-btn');
        for (const el of editBtns) {
            el.textContent = '編集';
        }
        const btns = document.getElementsByClassName('display-off');
        // if (btns[0].classList === 'edit-mode')
        for (const el of btns) {
            el.classList.remove('edit-mode');
        }
    }
    btn.addEventListener('click', (event) => {
        toggle(event);
        toggleDraggable(event); // 編集モードでのみコースの並び替え可
    });

    const samebtn = btn.cloneNode(true);
    samebtn.textContent = 'コースリスト';
    samebtn.addEventListener('click', (event) => {
        toggle(event);
        toggleDraggable(event);
    });

    const btnsWrapper = document.querySelector(
        '#frontpage-course-list .btns-wrapper'
    );
    btnsWrapper.prepend(btn);

    const anotherBtnsWrapper = document.querySelector(
        '#display-off-course-list .btns-wrapper'
    );
    anotherBtnsWrapper.prepend(samebtn);
}

// 編集モードを実装したら、編集モードが終了するときに一回だけ実行
// コースを非表示から表示にする際に記録したcourseidを削除
function removeIdFromStorage(id) {
    let newRemovedCourses = [];
    chrome.storage.sync.get(['removedCourses'], (items) => {
        for (const i of items.removedCourses) {
            if (i !== id) {
                newRemovedCourses.push(i);
            }
        }

        chrome.storage.sync.set({ removedCourses: newRemovedCourses }, () => {
            chrome.storage.sync.get(['removedCourses'], (items) => {
                removedCourses = items.removedCourses;
                // console.log(
                //     'removeIdFromStorage() : newRemovedCourses -> ' +
                //         removedCourses
                // );
            });
        });
    });
}

// summary.firstChildを置き換える
export function abbreviateSummary() {
    const summarries = document.querySelectorAll('.summary .no-overflow');

    for (const summary of Array.from(summarries)) {
        summary.classList.remove('no-overflow'); // .no-overflowのcssを排除するため
        const moreButton = addMoreButtonAfter(summary);

        const para = concatenateParagraphs(summary);
        summary.innerHTML = para.outerHTML;

        const textHeight = summary.firstChild.clientHeight;

        // テキスト要素のline-heightを取得
        let lineHeight = getComputedStyle(summary.firstChild).getPropertyValue(
            'line-height'
        );
        // [32.4px]のようなピクセル値が返ってくるので、数字だけにする
        lineHeight = lineHeight.replace(/[^-\d\.]/g, '');

        // メニューが6行以上だったら高さを5行にする
        if (textHeight > lineHeight * 3) {
            summary.firstChild.style.height = `${lineHeight * 3}px`;
        } else {
            // メニューが5行以下ならMoreボタン非表示
            moreButton.style.display = 'none';
            summary.firstChild.classList.remove('partial-text');
        }

        // Moreボタンを押したら、テキスト要素のis-openクラスを切り替え
        moreButton.addEventListener('click', (event) => {
            summary.firstChild.classList.toggle('partial-text');
            summary.firstChild.classList.toggle('is-open');

            // ボタンのテキストを入れ替え
            if (event.target.textContent === '全て表示')
                event.target.textContent = '戻す';
            else event.target.textContent = '全て表示';
        });
    }
}

function addMoreButtonAfter(summary) {
    const moreButton = document.createElement('div');
    moreButton.classList.add('more-button');
    moreButton.textContent = '全て表示';
    summary.insertAdjacentElement('afterend', moreButton);
    return moreButton;
}

function concatenateParagraphs(summary) {
    // 複数の<p>を一つの<p>にまとめる

    const para = document.createElement('p');
    para.classList.add('partial-text');
    let text = '';
    for (const p of summary.children) {
        text += p.innerHTML + '<br>';
    }
    para.innerHTML = text;
    return para;
}
