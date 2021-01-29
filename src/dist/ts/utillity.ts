export class Utillity {
    elem: any;
    constructor(elem: any){
        if(typeof elem === 'string'){
            this.elem = Array.prototype.slice.call(document.querySelectorAll(elem));
        }else{
            this.elem = elem;
        }
    }
    attr(name:string, value?: string){
        if(!value){
            return this.elem.getAttribute(name);
        }else{
            this.elem.setAttribute(name, value);
            return this;
        }
    }
    removeAttr(name:string){
        this.elem.removeAttribute(name);
        return this;
    }
    hasClass(className){
        return this.elem.classList ? this.elem.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(this.elem.className);
    }
    addClass(className: string){
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
    removeClass(className: string){
        if (this.elem.classList)
            this.elem.classList.remove(className);
        else
            this.elem.className = this.elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        return this;
    }
    toggleClass(className: string){
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
    parent(){
        this.elem = this.elem.parentElement;
        return this;
    }
}