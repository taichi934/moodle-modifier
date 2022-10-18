(() => {
    // await deleteRemovedCoursesInStorage();

    makeDisapperedCourseList();
    removeDisplayOffCourses();
    addDisplayOnOffButton();
    addCourseListToggleButton();
})();

let removedCourses = [];

// デバッグ時にstorageを全消去する用
// async function deleteRemovedCoursesInStorage() {
//     await chrome.storage.sync.clear();
// }

function makeDisapperedCourseList() {
    const disappearedCourseList = document.createElement('div');
    disappearedCourseList.id = 'display-off-course-list';
    disappearedCourseList.innerHTML =
        '<h2>マイコース<span>（非表示）</span></h2><div class="courses frontpage-course-list-enrolled"></div>';

    disappearedCourseList.style.display = 'none';

    const myCourse = document.getElementById('frontpage-course-list');
    myCourse.insertAdjacentElement('afterend', disappearedCourseList);
}

function removeDisplayOffCourses() {
    chrome.storage.sync.get(['removedCourses'], (items) => {
        removedCourses = items.removedCourses;
        console.log(
            'courseids of removedCourses from Storage -> ' + removedCourses
        );

        if (removedCourses.length === 0) return;

        let courses = document.getElementsByClassName('coursebox');
        const disappearedCourseList = document.getElementById(
            'display-off-course-list'
        );

        for (const id of removedCourses) {
            Array.from(courses).forEach((c) => {
                let cid = c.dataset.courseid;
                if (id === cid) {
                    moveCourseTo(c, disappearedCourseList);
                    c.children[2].textContent = '表示';
                }
            });
        }

        remapOddEven();
    });
}

function addDisplayOnOffButton() {
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

        c.appendChild(btn);
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

// マイコースと非表示にしたコースリストの切り替え
function addCourseListToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'course-list-toggle-btn';
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
        });
    }
    btn.addEventListener('click', toggle);

    const samebtn = btn.cloneNode(true);
    samebtn.textContent = 'コースリスト';
    samebtn.addEventListener('click', toggle);

    myCourse.insertBefore(btn, myCourse.children[1]);
    disappearedCourseList.insertBefore(
        samebtn,
        disappearedCourseList.children[1]
    );
}

// コースを非表示にした際にcourseidを記録
function saveCourseid(course) {
    removedCourses.push(course.dataset.courseid);
    chrome.storage.sync.set({ removedCourses: removedCourses }, () => {
        console.log('saveCourseid() : removedCourseid -> ' + removedCourses);
    });
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
                console.log(
                    'removeIdFromStorage() : newRemovedCourses -> ' +
                        removedCourses
                );
            });
        });
    });
}
