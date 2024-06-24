export function isMobileOS() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let regex = /Mobi|Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(userAgent) && !window.MSStream
    if (regex || ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        return 'mobile'
    }
    return '';
}