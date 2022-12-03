import {
    makeDisapperedCourseList,
    removeDisplayOffCourses,
    addEditMode,
    addDisplayOnOffButton,
    addCourseListToggleButton,
    abbreviateSummary,
} from './modules/editMyCourse.js';
import { sortCourses, setCoursesDraggable } from './modules/reorderCourses.js';

(() => {
    window.addEventListener('DOMContentLoaded', () => {
        // コースを非表示にできるように
        makeDisapperedCourseList();
        removeDisplayOffCourses();
        addEditMode();
        addDisplayOnOffButton();
        addCourseListToggleButton();

        //　コースサマリーを省略
        abbreviateSummary();

        // コースの並び替え
        sortCourses();
        setCoursesDraggable();
    });
})();
