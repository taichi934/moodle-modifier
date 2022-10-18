(() => {
    makeDisapperedCourseList();
    removeDisplayOffCourses();

    const courses = document.getElementsByClassName('coursebox');
    addDisplayOnOffButton(courses);

    addCourseListToggleButton();
})();

function makeDisapperedCourseList() {
    const disappearedCourseList = document.createElement('div');
    disappearedCourseList.id = 'display-off-course-list';
    disappearedCourseList.innerHTML =
        '<h2>マイコース<span>（非表示）</span></h2><div class="courses frontpage-course-list-enrolled"></div>';

    // disappearedCourseList.style.display = 'none';

    const myCourse = document.getElementById('frontpage-course-list');
    myCourse.insertAdjacentElement('afterend', disappearedCourseList);
}

function addDisplayOnOffButton(courses) {
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

                saveCourseid(c);
            } else {
                moveCourseTo(c, myCourseList);
                btn.textContent = '非表示';
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

let removedCourses = [];
function saveCourseid(course) {
    removedCourses.push(course.dataset.courseid);
    chrome.storage.sync.set({ removedCourses: removedCourses }, () => {
        console.log('courseid: ' + removedCourses);
        chrome.storage.sync.get(null, (item) => {
            console.log('keys of data -> ' + Object.keys(item));
            console.log('removedCourses -> ' + typeof item.removedCourses);
        });
    });
}

function removeDisplayOffCourses() {
    chrome.storage.sync.get(['removedCourses'], (item) => {
        removedCourses = item.removedCourses; // array
        console.log('courseids of removedCourses -> ' + removedCourses);

        let courses = document.getElementsByClassName('coursebox');
        const disappearedCourseList = document.getElementById(
            'display-off-course-list'
        );

        for (id of removedCourses) {
            Array.from(courses).forEach((c) => {
                if (id === c.dataset.courseid)
                    moveCourseTo(c, disappearedCourseList);
            });
        }
    });
}
