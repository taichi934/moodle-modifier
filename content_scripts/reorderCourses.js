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

    console.log('success!');
}

function onDragStart(event) {
    event.dataTransfer.setData('text/plane', event.target.dataset.courseid);

    console.log(event.target.dataset.courseid);
}

function onDragOver(event) {
    event.preventDefault();
    event.target.style.borderTop = '3px solid #fff';
}

function onDragLeave(event) {
    event.target.style.borderTop = '';
}

function onDrop(event) {
    event.preventDefault();
    const courseid = event.dataTransfer.getData('text/plane');
    const draggingCourse = document.querySelector(
        `div[data-courseid='${courseid}']`
    );
    event.target.parentNode.insertBefore(draggingCourse, event.target);
    event.target.style.borderTop = '';
}
