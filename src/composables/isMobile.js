export function isMobile() {
    let userAgent = navigator.userAgent;
    let isMobile = (/Mobi|Android|webOS|iPhone|Windows Phone|Blackberry/i.test(userAgent) &&  window.innerWidth <= 768) && !window.MSStream 
    
    if (isMobile) return true
}