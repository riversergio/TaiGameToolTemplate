import { _ } from './utillity.js';
var MobileNav = /** @class */ (function () {
    function MobileNav(selector) {
        this.element = _(selector).elem;
        this.items = _(selector).find('.nav-item');
    }
    // Event
    MobileNav.prototype.reset = function (id) {
        var newItems = this.items;
        if (id)
            newItems = this.items.filter(function (item) { return item.id !== id; });
        newItems.forEach(function (item) {
            var holder = _(item);
            if (holder.hasClass('active'))
                holder.removeClass('active');
        });
    };
    MobileNav.prototype.handleClickOutsideEvent = function (e) {
        e.preventDefault();
        var htmlDoc = _(document);
        var items = document.querySelectorAll('.nav-item');
        items.forEach(function (item) {
            var holder = _(item);
            if (holder.hasClass('active'))
                holder.removeClass('active');
        });
        htmlDoc.off('click');
    };
    // Init
    MobileNav.prototype.init = function () {
        var self = this;
        var doc = _(document);
        // Clone nav
        var mainMenu = _('#main-menu').clone().attr('id', 'mobile-menu').attr('class', 'nav-item-holder');
        var toggleMenu = _('#toggleMenu');
        toggleMenu.append(mainMenu.elem);
        this.items.forEach(function (item) {
            var itemHolder = _(item);
            // console.log(itemHolder);
            if (itemHolder.attr('id')) {
                // If item has ID
                var button = itemHolder.children('.nav-link');
                var holder = itemHolder.children('.nav-item-holder');
                console.log(itemHolder.children());
                if (holder)
                    holder.on('click', function (e) { return e.stopPropagation(); });
                button.on('click', function (e) {
                    e.stopPropagation();
                    var current = _(e.currentTarget).parent();
                    var currentId = current.attr('id');
                    // Toggle State
                    current.toggleClass('active');
                    self.reset(currentId);
                    doc.on('click', self.handleClickOutsideEvent);
                });
            }
        });
    };
    return MobileNav;
}());
export { MobileNav };
