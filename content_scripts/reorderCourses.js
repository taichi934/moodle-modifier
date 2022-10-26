(() => {
    window.addEventListener('load', setCoursesDraggable);
})();

function setCoursesDraggable() {
    const courses = document.getElementsByClassName('coursebox');

    for (const course of Array.from(courses)) {
        course.setAttribute('draggable', 'true');

        course.ondragstart = onDragStart;
        course.ondragover = onDragOver;
        course.ondragleave = onDragLeave;
        course.ondrop = onDrop;
    }
}

function onDragStart(event) {
    event.dataTransfer.setData(
        'text/plane',
        event.currentTarget.dataset.courseid
    );
    event.currentTarget.style.opacity = 0.4;
}

function onDragOver(event) {
    event.preventDefault();
    event.currentTarget.style.borderTop = '3px solid blue';
}

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
}
