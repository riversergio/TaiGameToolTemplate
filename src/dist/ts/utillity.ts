class Utillity {
    static selectedElements: Array<Utillity> = []; // Store all of selected elements
    elem: Element; // Object element
    elems: Array<Element>; // Array of object elements
    clickEvent: any; // Click Event Store
    constructor(elem: any){
        let flag:Boolean = false; // Flag for checking if the next element is exist or not
        let selectedObj:Object = {clickEvent: null}; // Default value
        if(typeof elem === 'string'){
            const selectedElements = document.querySelectorAll(elem);
            if(selectedElements.length > 1)
                selectedObj["elems"] = selectedElements;
            else
                selectedObj["elem"] = selectedElements[0];
        }else
            if (elem.length)
                if(elem.length > 1)
                    selectedObj["elems"] = elem;
                else
                    selectedObj["elem"] = elem;
            else
                selectedObj["elem"] = elem;
        Utillity.selectedElements.forEach(selected => {
            if ((selected.elem === elem) && (selected.elem.innerHTML === elem.innerHTML)){
                for (let key in selectedObj) this[key] = selected[key];
                flag = true;
                return false;
            }
        });
        if(!flag){
            for (let key in selectedObj) this[key] = selectedObj[key];
            // Check if the selected element is Empty or not
            Utillity.selectedElements.push(this);
        }
    }
    // Methods
    // Working with element attributes
    attr(name:string, value?: string):any {
        if(!value)
            return this.elem.getAttribute(name);
        this.elem.setAttribute(name, value);
        return this;
    }
    removeAttr(name:string):Utillity {
        this.elem.removeAttribute(name);
        return this;
    }
    hasClass(className):Boolean { 
        return this.elem.classList ? this.elem.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elem.className);
    }
    addClass(className: string):Utillity {
        if (this.elem.classList) {
            this.elem.classList.add(className);
        } else {
            var current = this.elem.className, found = false;
            var all = current.split(' ');
            for (var i = 0; i < all.length, !found; i++) found = all[i] === className;
            if (!found) {
                if (current === '') this.elem.className = className;
                else this.elem.className += ' ' + className;
            }
        }
        return this;
    }
    removeClass(className: string):Utillity {
        if (this.elem.classList)
            this.elem.classList.remove(className);
        else
            this.elem.className = this.elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    }
    toggleClass(className: string):Utillity{
        if (this.elem.classList) {
            this.elem.classList.toggle(className);
        } else {
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
    }
    // Working with DOM
    append(elem: Element):Utillity {
        this.elem.appendChild(elem);
        return this;
    }
    parent():Utillity{
        return new Utillity(this.elem.parentElement);
    }
    next():Utillity{
        return new Utillity(this.elem.nextElementSibling);
    }
    find(selector: string):any{
        const elem = this.elem.querySelectorAll(selector);
        if(elem.length > 1)
            return new Utillity(Array.prototype.slice.call(elem));
        else if(elem.length == 1)
            return new Utillity(elem[0]);
        else
            return new Utillity([]);
    }
    children(selector?: string):any {
        const list = selector ? Array.prototype.slice.call(this.elem.querySelectorAll(`:scope>${selector}`)) : Array.prototype.slice.call(this.elem.children);
        if(!list.length)
            console.warn("Can't find "+ selector +" for "+ this.elem.tagName.toLowerCase() + (this.elem.id ? `#${this.elem.id}` : `.${this.elem.className}`));
        else{
            if(list.length > 1)
                return new Utillity(list);
            else
                return new Utillity(list[0]);
        }
    }
    clone():Utillity {
        return new Utillity(this.elem.cloneNode(true));
    }
    html(content?:string):any {
        if(!content) return this.elem.innerHTML;
        else this.elem.innerHTML = content;
    }
    outHtml():string {
        return this.elem.outerHTML;
    }
    wrap(tag:string,options?:object) {
        let elem = `<${tag}`;
        if(options)
            for(let attr in options)
                elem+=` ${attr}='${options[attr]}'`;
        elem+=`>${this.elem.outerHTML}</${tag}>`;
        this.elem.outerHTML = elem;
        return this;
    }
    wrapAll(tag:string,options?:object):Utillity {
        if (typeof this.elems === 'undefined') throw new Error('The selector must be an array');
        if(!tag) throw new Error("Please add a wrap tag");
        const wrapElement = new Utillity(document.createElement(tag));
        if (options)
            for (let attr in options)
                wrapElement.attr(attr, options[attr]);
        const lastElement = new Utillity(this.elems[this.elems.length - 1]);
        const parentElement = lastElement.parent();
        this.elems.forEach((elem, index) => wrapElement.append(elem));
        parentElement.html(wrapElement.outHtml());
        return this;
    }
    // Event handlers
    on(event:string, callback:any){
        this.clickEvent = callback;
        this.elem.addEventListener(event,this.clickEvent);
    }
    off(event){
        if(event === 'click'){
            this.elem.removeEventListener(event,this.clickEvent);
        }
    }
    each(callback:Function){
        if (typeof this.elems === 'undefined') throw new Error('The selector must be an array');
        if (!callback) throw new Error("Please add a callback function for each loop");
        Array.prototype.forEach.call(this.elems, (elem, index) => callback(index, new Utillity(elem)));
    }
    moveToTop(to,duration){
        const
            element = document.scrollingElement || document.documentElement,
            start = element.scrollTop,
            change = to - start,
            startDate = +new Date(),
            // t = current time
            // b = start value
            // c = change in value
            // d = duration
            easeInOutQuad = function (t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            animateScroll = function () {
                const currentDate = +new Date();
                const currentTime = currentDate - startDate;
                element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
                else {
                    element.scrollTop = to;
                }
            };
        animateScroll();
    }
    // slider
    initSlider(options?: object){
        const sliderItems = new Utillity(this.elem).children(), listSelector = 'splide__list', trackSelector = 'splide__track';
        // Return the element to standard slider layout
        sliderItems.each((i,el) => {
            el.addClass(`splide__slide`).addClass(`splide__slide-${i+1}`);
        });
        sliderItems.wrapAll('div',{
            class: listSelector
        });
        const splideList = new Utillity(this.elem).find('.'+listSelector);
        splideList.wrap('div',{
            class: trackSelector
        });
        // Initial
        new Utillity(this.elem).addClass('splide');
        // @ts-ignore
        new Splide(this.elem).mount();
    }
}

export default function _(selector:any):Utillity{
    return new Utillity(selector);
}