export default function preventKeyBoardScroll (e) {
    if ([38, 40].includes(e.keyCode)) {
        e.preventDefault();
        return false;
    }
}