export function ChangeResize(win, doc) {
    change();

    function change() {
        var deviceWidth = doc.documentElement.clientWidth;
        doc.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
    }
    win.addEventListener('resize', change, false);
    win.addEventListener('orientationchange', change, false);
}