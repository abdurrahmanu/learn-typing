export default function useEventListener(event, listener, remove) { // windowEvents

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

// import {handleBlur, handleClick, handleFocus, handleKeydown, handleOffline, handleOnline, handleTouchMove, handleWheel} from "./eventHandlers";

// export default function useEventListener(target, listener, remove) {
//     if (!target) return    

//     if (listener === 'touchmove') {
//         if (!remove) target.addEventListener('touchmove', handleTouchMove);
//         else target.removeEventListener('touchmove', handleTouchMove);
//     } 
    
//     else if (listener === 'wheel') {
//         if (!remove) target.addEventListener('wheel', handleWheel);
//         else target.removeEventListener('wheel', handleWheel);
//     } 
    
//     else if (listener === 'blur') {
//         if (!remove) target.addEventListener('blur', handleBlur);
//         else target.removeEventListener('blur', handleBlur);
//     } 
    
//     else if (listener === 'focus') {
//         if (!remove) target.addEventListener('focus', handleFocus);
//         else target.removeEventListener('focus', handleFocus);
//     } 
    
//     else if (listener === 'offline') {
//         if (!remove) target.addEventListener('offline', handleOffline);
//         else target.removeEventListener('offline', handleOffline);
//     } 
    
//     else if (listener === 'online') {
//         if (!remove) target.addEventListener('online', handleOnline);
//         else target.removeEventListener('online', handleOnline);
//     } 
    
//     else if (listener === 'keydown') {
//         if (!remove) target.addEventListener('keydown', handleKeydown);
//         else target.removeEventListener('keydown', handleKeydown);
//     } 
    
//     else if (listener === 'click') {
//         if (!remove) target.addEventListener('click', handleClick);
//         else target.removeEventListener('click', handleClick)
//     }
// }