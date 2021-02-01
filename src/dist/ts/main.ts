import _ from './utillity.js';
import MobileNav from './mobileNav.js';

document.addEventListener('DOMContentLoaded',e => {
    // Dom loaded
    const mobileBottomNav = new MobileNav('#mobile-navigation');
    const featuredAppSlider = _('.featured-app-slider');
    // @ts-ignore
    featuredAppSlider.initSlider();
    // searchToggleBtn.wrapAll('div');
    mobileBottomNav.init();
})
