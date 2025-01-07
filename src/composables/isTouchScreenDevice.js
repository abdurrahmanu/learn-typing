export function isTouchScreenDevice() {    
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return true
}