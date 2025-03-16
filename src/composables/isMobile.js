// var words = require('an-array-of-english-words')


export function isMobile() {
    // console.log(words.filt/er(d => /fun/.test(d)))
    let userAgent = navigator.userAgent
    let isMobile = (/Mobi|Android|webOS|iPhone|Windows Phone|Blackberry/i.test(userAgent) &&  window.innerWidth <= 768) && !window.MSStream 
    
    if (isMobile) return true
}