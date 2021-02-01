var Utillity = /** @class */ (function () {
    function Utillity(elem) {
        var _this = this;
        var flag = false; // Flag for checking if the next element is exist or not
        var selectedObj = { clickEvent: null }; // Default value
        if (typeof elem === 'string') {
            var selectedElements = document.querySelectorAll(elem);
            if (selectedElements.length > 1)
                selectedObj["elems"] = selectedElements;
            else
                selectedObj["elem"] = selectedElements[0];
        }
        else if (elem.length)
            if (elem.length > 1)
                selectedObj["elems"] = elem;
            else
                selectedObj["elem"] = elem;
        else
            selectedObj["elem"] = elem;
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
        if (!value)
            return this.elem.getAttribute(name);
        this.elem.setAttribute(name, value);
        return this;
    };
    Utillity.prototype.removeAttr = function (name) {
        this.elem.removeAttribute(name);
        return this;
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
        if (elem.length > 1)
            return new Utillity(Array.prototype.slice.call(elem));
        else if (elem.length == 1)
            return new Utillity(elem[0]);
        else
            return new Utillity([]);
    };
    Utillity.prototype.children = function (selector) {
        var list = selector ? Array.prototype.slice.call(this.elem.querySelectorAll(":scope>" + selector)) : Array.prototype.slice.call(this.elem.children);
        if (!list.length)
            console.warn("Can't find " + selector + " for " + this.elem.tagName.toLowerCase() + (this.elem.id ? "#" + this.elem.id : "." + this.elem.className));
        else {
            if (list.length > 1)
                return new Utillity(list);
            else
                return new Utillity(list[0]);
        }
    };
    Utillity.prototype.clone = function () {
        return new Utillity(this.elem.cloneNode(true));
    };
    Utillity.prototype.html = function (content) {
        if (!content)
            return this.elem.innerHTML;
        else
            this.elem.innerHTML = content;
    };
    Utillity.prototype.outHtml = function () {
        return this.elem.outerHTML;
    };
    Utillity.prototype.wrap = function (tag, options) {
        var elem = "<" + tag;
        if (options)
            for (var attr in options)
                elem += " " + attr + "='" + options[attr] + "'";
        elem += ">" + this.elem.outerHTML + "</" + tag + ">";
        this.elem.outerHTML = elem;
        return this;
    };
    Utillity.prototype.wrapAll = function (tag, options) {
        if (typeof this.elems === 'undefined')
            throw new Error('The selector must be an array');
        if (!tag)
            throw new Error("Please add a wrap tag");
        var wrapElement = new Utillity(document.createElement(tag));
        if (options)
            for (var attr in options)
                wrapElement.attr(attr, options[attr]);
        var lastElement = new Utillity(this.elems[this.elems.length - 1]);
        var parentElement = lastElement.parent();
        this.elems.forEach(function (elem, index) { return wrapElement.append(elem); });
        parentElement.html(wrapElement.outHtml());
        return this;
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
    Utillity.prototype.each = function (callback) {
        if (typeof this.elems === 'undefined')
            throw new Error('The selector must be an array');
        if (!callback)
            throw new Error("Please add a callback function for each loop");
        Array.prototype.forEach.call(this.elems, function (elem, index) { return callback(index, new Utillity(elem)); });
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
    // slider
    Utillity.prototype.initSlider = function (options) {
        var sliderItems = new Utillity(this.elem).children(), listSelector = 'splide__list', trackSelector = 'splide__track';
        // Return the element to standard slider layout
        sliderItems.each(function (i, el) {
            el.addClass("splide__slide").addClass("splide__slide-" + (i + 1));
        });
        sliderItems.wrapAll('div', {
            "class": listSelector
        });
        var splideList = new Utillity(this.elem).find('.' + listSelector);
        splideList.wrap('div', {
            "class": trackSelector
        });
        // Initial
        new Utillity(this.elem).addClass('splide');
        // @ts-ignore
        new Splide(this.elem).mount();
    };
    Utillity.selectedElements = []; // Store all of selected elements
    return Utillity;
}());
export default function _(selector) {
    return new Utillity(selector);
}
