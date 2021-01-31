var Utillity = /** @class */ (function () {
    function Utillity(elem) {
        var _this = this;
        var flag = false; // Flag for checking if the next element is exist or not
        var selectedObj = {
            elem: typeof elem === 'string' ? document.querySelector(elem) : elem,
            clickEvent: null
        }; // Default value
        Utillity.selectedElements.forEach(function (selected) {
            if ((selected.elem === elem) && (selected.elem.innerHTML === elem.innerHTML)) {
                for (var key in selectedObj)
                    _this[key] = selected[key];
                flag = true;
                return false;
            }
        });
        if (!flag) {
            for (var key in selectedObj)
                this[key] = selectedObj[key];
            // Check if the selected element is Empty or not
            Utillity.selectedElements.push(this);
        }
    }
    // Methods
    // Working with element attributes
    Utillity.prototype.attr = function (name, value) {
        if (!value) {
            return this.elem.getAttribute(name);
        }
        else {
            this.elem.setAttribute(name, value);
            return this;
        }
    };
    Utillity.prototype.removeAttr = function (name) {
        this.elem.removeAttribute(name);
        return this.elem;
    };
    Utillity.prototype.hasClass = function (className) {
        return this.elem.classList ? this.elem.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elem.className);
    };
    Utillity.prototype.addClass = function (className) {
        if (this.elem.classList) {
            this.elem.classList.add(className);
        }
        else {
            var current = this.elem.className, found = false;
            var all = current.split(' ');
            for (var i = 0; i < all.length, !found; i++)
                found = all[i] === className;
            if (!found) {
                if (current === '')
                    this.elem.className = className;
                else
                    this.elem.className += ' ' + className;
            }
        }
        return this;
    };
    Utillity.prototype.removeClass = function (className) {
        if (this.elem.classList)
            this.elem.classList.remove(className);
        else
            this.elem.className = this.elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    };
    Utillity.prototype.toggleClass = function (className) {
        if (this.elem.classList) {
            this.elem.classList.toggle(className);
        }
        else {
            var classes = this.elem.className.split(' ');
            var existingIndex = -1;
            for (var i = classes.length; i--;) {
                if (classes[i] === className)
                    existingIndex = i;
            }
            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);
            this.elem.className = classes.join(' ');
        }
        return this;
    };
    // Working with DOM
    Utillity.prototype.append = function (elem) {
        this.elem.appendChild(elem);
        return this;
    };
    Utillity.prototype.parent = function () {
        return new Utillity(this.elem.parentElement);
    };
    Utillity.prototype.next = function () {
        return new Utillity(this.elem.nextElementSibling);
    };
    Utillity.prototype.find = function (selector) {
        var elem = this.elem.querySelectorAll(selector);
        if (elem.length > 1) {
            return Array.prototype.slice.call(elem);
        }
        else if (elem.length == 1) {
            return new Utillity(elem[0]);
        }
        else {
            return null;
        }
    };
    Utillity.prototype.children = function (selector) {
        var filtered = Array.prototype.slice.call(this.elem.children);
        if (selector)
            filtered = Array.prototype.slice.call(this.elem.querySelectorAll(":scope > " + selector));
        if (filtered.length > 1) {
            var res_1 = [];
            filtered.forEach(function (item) { return res_1.push(new Utillity(item)); });
            return res_1;
        }
        else if (filtered.length == 1) {
            return new Utillity(filtered[0]);
        }
        else {
            return null;
        }
    };
    Utillity.prototype.clone = function () {
        return new Utillity(this.elem.cloneNode(true));
    };
    // Event handlers
    Utillity.prototype.on = function (event, callback) {
        this.clickEvent = callback;
        this.elem.addEventListener(event, this.clickEvent);
    };
    Utillity.prototype.off = function (event) {
        if (event === 'click') {
            this.elem.removeEventListener(event, this.clickEvent);
        }
    };
    Utillity.prototype.moveToTop = function (to, duration) {
        var element = document.scrollingElement || document.documentElement, start = element.scrollTop, change = to - start, startDate = +new Date(), 
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }, animateScroll = function () {
            var currentDate = +new Date();
            var currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
        animateScroll();
    };
    Utillity.selectedElements = []; // Store all of selected elements
    return Utillity;
}());
export function _(selector) {
    return new Utillity(selector);
}
