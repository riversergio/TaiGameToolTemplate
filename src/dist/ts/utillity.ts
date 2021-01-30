class Utillity {
    static selectedElements: Array<Utillity> = []; // Store all of selected elements
    elem: any; // Object element
    clickEvent: any; // Click Event Store
    constructor(elem: any){
        let flag:Boolean = false; // Flag for checking if the next element is exist or not
        let selectedObj:Object = {
            elem: typeof elem === 'string' ? document.querySelector(elem) : elem,
            clickEvent: null
        }; // Default value
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
        if(!value){
            return this.elem.getAttribute(name);
        }else{
            this.elem.setAttribute(name, value);
            return this;
        }
    }
    removeAttr(name:string):Utillity {
        this.elem.removeAttribute(name);
        return this.elem;
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
        if(elem.length > 1){
            return Array.prototype.slice.call(elem);
        }else if(elem.length == 1){
            return new Utillity(elem[0]);
        }else{
            return null;
        }
    }
    children(selector?: string):any {
        let filtered = Array.prototype.slice.call(this.elem.children);
        if(selector)
            filtered = Array.prototype.slice.call(this.elem.querySelectorAll(`:scope > ${selector}`));
        if (filtered.length > 1) {
            const res:Array<Utillity> = [];
            filtered.forEach(item => res.push(new Utillity(item)));
            return res;
        } else if (filtered.length == 1) {
            return new Utillity(filtered[0]);
        } else {
            return null;
        }
    }
    clone() {
        return new Utillity(this.elem.cloneNode(true));
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
}

export function _(selector:any):Utillity{
    return new Utillity(selector);
}