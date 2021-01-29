import { MobileNav } from './mobileNav.js';
document.addEventListener('DOMContentLoaded', function (e) {
    // Dom loaded
    var mobileBottomNav = new MobileNav('#mobile-navigation');
    var searchToggleBtn = document.querySelector('#toggleSearch');
    mobileBottomNav.init();
});
