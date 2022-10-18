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

function removeDisplayOffCourses(removedCourses) {
    // let removedCourses = [];

    chrome.storage.sync.get(['removedCourses'], (items) => {
        removedCourses = items.removedCourses; // array
        console.log(
            'courseids of removedCourses from Storage -> ' + removedCourses
        );
        // console.log('length of removedCourses -> ' + removedCourses.length);
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
    });
}

function addDisplayOnOffButton(courses, removedCourses) {
    const myCourseList = document.getElementById('frontpage-course-list');
    const disappearedCourseList = document.getElementById(
        'display-off-course-list'
    );

    Array.from(courses).forEach((c) => {
        const btn = document.createElement('button');
        btn.classList.add('display-off');
        btn.setAttribute('type', 'button');
        btn.textContent = '非表示';

        btn.addEventListener('click', () => {
            if (btn.textContent === '非表示') {
                moveCourseTo(c, disappearedCourseList);
                btn.textContent = '表示';

                saveCourseid(c, removedCourses);
            } else {
                console.log('addEventListener removeIdFromStorage');
                moveCourseTo(c, myCourseList);
                btn.textContent = '非表示';
                removeIdFromStorage(c.dataset.courseid);
            }
            // マイコースのoddとevenのクラスを更新処理
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

// let removedCourses = [];
// コースを非表示にした際にcourseidを記録
function saveCourseid(course, removedCourses) {
    // let removedCourses = [];
    removedCourses.push(course.dataset.courseid);
    chrome.storage.sync.set({ removedCourses: removedCourses }, () => {
        console.log('array of courseid: ' + removedCourses);
        // chrome.storage.sync.get(['removedCourses'], (items) => {
        //     console.log('removedCourses -> ' + items.removedCourses);
        // });
    });
}

// 編集モードを実装したら、編集モードが終了するときに一回だけ実行
// コースを非表示から表示にする際に記録したcourseidを削除
function removeIdFromStorage(id) {
    // console.log('removeIdFromStorage fired!');

    let newRemovedCourses = [];
    chrome.storage.sync.get(['removedCourses'], (items) => {
        for (const i of items.removedCourses) {
            if (i !== id) {
                newRemovedCourses.push(i);
            }
        }
        // console.log('newRemovedCourses -> ' + newRemovedCourses);

        chrome.storage.sync.set({ removedCourses: newRemovedCourses }, () => {
            chrome.storage.sync.get(['removedCourses'], (items) => {
                console.log('newRemovedCourses -> ' + items.removedCourses);
            });
        });
    });
}

(async () => {
    // await deleteRemovedCoursesInStorage();

    let removedCourses = [];
    makeDisapperedCourseList();

    removeDisplayOffCourses(removedCourses);

    const courses = document.getElementsByClassName('coursebox');
    addDisplayOnOffButton(courses, removedCourses);

    addCourseListToggleButton();
})();
