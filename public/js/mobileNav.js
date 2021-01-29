import { Utillity } from './utillity.js';
var MobileNav = /** @class */ (function () {
    function MobileNav(selector) {
        this.element = document.querySelector(selector);
        this.items = Array.prototype.slice.call(this.element.querySelectorAll('.nav-item'));
    }
    // Event
    MobileNav.prototype.reset = function (id) {
        var newItems = this.items;
        if (id) {
            newItems = this.items.filter(function (item) {
                return item.id !== id;
            });
        }
        newItems.forEach(function (item) {
            var holder = new Utillity(item);
            if (holder.hasClass('active')) {
                // Remove All other active state
                holder.removeClass('active');
            }
        });
    };
    MobileNav.prototype.handleToggleSearch = function (target) {
    };
    MobileNav.prototype.handleToggleMenu = function (target) {
    };
    MobileNav.prototype.handleToggleContact = function (target) {
    };
    MobileNav.prototype.handleClickOutsideEvent = function (elem) {
        console.log(elem);
    };
    // Init
    MobileNav.prototype.init = function () {
        var self = this;
        this.items.forEach(function (item) {
            var itemHolder = new Utillity(item);
            if (itemHolder.attr('id')) {
                // If item has ID
                var button = itemHolder.elem.querySelector('.nav-link');
                button.addEventListener('click', function (e) {
                    e.stopPropagation();
                    var current = new Utillity(e.currentTarget).parent();
                    var currentId = current.attr('id');
                    // Set click outsideClickEvent
                    // Reset
                    self.reset(currentId);
                    // Toggle State
                    current.toggleClass('active');
                    if (currentId === 'toggleSearch')
                        self.handleToggleSearch(new Utillity(e.currentTarget).parent());
                    if (currentId === 'toggleMenu')
                        self.handleToggleMenu(new Utillity(e.currentTarget).parent());
                    if (currentId === 'toggleContact')
                        self.handleToggleContact(new Utillity(e.currentTarget).parent());
                });
            }
        });
    };
    return MobileNav;
}());
export { MobileNav };
