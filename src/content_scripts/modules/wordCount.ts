// https://moodle2022.wakayama-u.ac.jp/2022/mod/questionnaire/complete.php?

export function addWordCounter(): void {
    // add DOM
    addWordCounterToDOM();

    // add count feature
    const editors = document.getElementsByClassName(
        'editor_atto_content'
    ) as HTMLCollectionOf<HTMLDivElement>;

    for (const editor of editors) {
        editor.addEventListener('keydown', () => {
            const count: number | undefined = editor?.textContent?.length;
            if (count) {
                reflectCountToDOM(editor, count);
            }
        });
    }
}

function addWordCounterToDOM(): void {
    const toolbars = document.getElementsByClassName(
        'editor_atto_toolbar'
    ) as HTMLCollectionOf<HTMLDivElement>;

    for (const tb of toolbars) {
        const wordCounter: HTMLDivElement = createWordCounter();
        tb.append(wordCounter);
    }
}

function createWordCounter(): HTMLDivElement {
    const wordCounter = document.createElement('div');
    wordCounter.className = 'word-count';
    wordCounter.innerHTML = `<span>文字数：0 文字</span>`;
    return wordCounter;
}

function reflectCountToDOM(editor: HTMLDivElement, count: number): void {
    const editorWrapper = editor.parentElement;
    const toolbar = editorWrapper?.previousElementSibling;

    const counter = toolbar?.lastElementChild;
    if (counter) {
        counter.innerHTML = `<span>文字数：${count} 文字</span>`;
    }
}
