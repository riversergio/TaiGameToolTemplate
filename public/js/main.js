import _ from './utillity.js';
import MobileNav from './mobileNav.js';
document.addEventListener('DOMContentLoaded', function (e) {
    // Dom loaded
    var mobileBottomNav = new MobileNav('#mobile-navigation');
    var featuredAppSlider = _('.featured-app-slider');
    // @ts-ignore
    featuredAppSlider.initSlider();
    // searchToggleBtn.wrapAll('div');
    mobileBottomNav.init();
});
