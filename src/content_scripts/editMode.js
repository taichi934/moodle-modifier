import {
    makeDisapperedCourseList,
    removeDisplayOffCourses,
    addEditMode,
    addDisplayOnOffButton,
    addCourseListToggleButton,
    abbrebiateSummary,
} from './editMyCourse.js';
import { sortCourses, setCoursesDraggable } from './reorderCourses.js';

(() => {
    window.addEventListener('DOMContentLoaded', () => {
        // コースを非表示にできるように
        makeDisapperedCourseList();
        removeDisplayOffCourses();
        addEditMode();
        addDisplayOnOffButton();
        addCourseListToggleButton();

        //　コースサマリーを省略
        abbrebiateSummary();

        // コースの並び替え
        sortCourses();
        setCoursesDraggable();
    });
})();
