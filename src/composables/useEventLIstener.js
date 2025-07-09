import { isMobile } from "./isMobile";

export default function useEventListener(event, listener, remove, target) { // windowEvents

    if (target && isMobile()) {
        if (!remove) window.addEventListener('input', listener);
        else window.removeEventListener('input', listener);
    }

    if (event === 'touchmove') {
        if (!remove) window.addEventListener('touchmove', listener);
        else window.removeEventListener('touchmove', listener);
    } 
    
    else if (event === 'wheel') {
        if (!remove) window.addEventListener('wheel', listener);
        else window.removeEventListener('wheel', listener);
    } 
    
    else if (event === 'blur') {
        if (!remove) window.addEventListener('blur', listener);
        else window.removeEventListener('blur', listener);
    } 
    
    else if (event === 'focus') {
        if (!remove) window.addEventListener('focus', listener);
        else window.removeEventListener('focus', listener);
    } 
    
    else if (event === 'offline') {
        if (!remove) window.addEventListener('offline', listener);
        else window.removeEventListener('offline', listener);
    } 
    
    else if (event === 'online') {
        if (!remove) window.addEventListener('online', listener);
        else window.removeEventListener('online', listener);
    } 
    
    else if (event === 'keydown') {
        if (!remove) window.addEventListener('keydown', listener);
        else window.removeEventListener('keydown', listener);
    } 
    
    else if (event === 'click') {
        if (!remove) window.addEventListener('click', listener);
        else window.removeEventListener('click', listener)
    }
}