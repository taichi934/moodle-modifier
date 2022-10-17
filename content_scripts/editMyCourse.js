(() => {
    const courses = document.getElementsByClassName('coursebox');
    addDisplayOffButton(courses);

    makeDisapperedCourseList();

    addCourseListToggleButton();
})();

function addDisplayOffButton(courses) {
    Array.from(courses).forEach((c) => {
        const btn = document.createElement('button');
        btn.classList.add('display-off');
        btn.setAttribute('type', 'button');
        btn.textContent = '非表示';
        btn.addEventListener('click', () => {
            const myCourseList = document.getElementById(
                'frontpage-course-list'
            );
            const disappearedCourseList = document.getElementById(
                'display-off-course-list'
            );
            if (btn.textContent === '非表示') {
                moveCourseTo(c, disappearedCourseList);
                btn.textContent = '表示';
            } else {
                moveCourseTo(c, myCourseList);
                btn.textContent = '非表示';
            }
            // マイコースのoddとevenのクラスを更新処理
        });

        c.appendChild(btn);
    });
}

function makeDisapperedCourseList() {
    const disappearedCourseList = document.createElement('div');
    disappearedCourseList.id = 'display-off-course-list';
    disappearedCourseList.innerHTML =
        '<h2>マイコース<span>（非表示）</span></h2><div class="courses frontpage-course-list-enrolled"></div>';

    // disappearedCourseList.style.display = 'none';

    const myCourse = document.getElementById('frontpage-course-list');
    myCourse.insertAdjacentElement('afterend', disappearedCourseList);
}

function moveCourseTo(course, des) {
    course.style.display = 'none';
    des.children[2].insertBefore(course, des.children[2].lastChild);
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
