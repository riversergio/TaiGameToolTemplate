import {MobileNav} from './mobileNav.js';
document.addEventListener('DOMContentLoaded',e => {
    // Dom loaded
    const mobileBottomNav = new MobileNav('#mobile-navigation');
    const searchToggleBtn = document.querySelector('#toggleSearch');

    mobileBottomNav.init();
})