(() => {
    const courses = document.getElementsByClassName('coursebox');
    addDisplayOffButton(courses);
})();

function addDisplayOffButton(courses) {
    Array.from(courses).forEach((c) => {
        const btn = document.createElement('button');
        btn.classList.add('display-off');
        btn.setAttribute('type', 'button');
        btn.textContent = '非表示';
        btn.addEventListener('click', () => {
            c.style.display = 'none';

            // マイコースのoddとevenのクラスを更新処理
        });

        c.appendChild(btn);
    });
}
