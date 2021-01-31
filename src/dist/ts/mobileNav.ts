import { _ } from './utillity.js';

export class MobileNav {
    element: Element;
    items: Array<Element>;
    constructor(selector: string){
        this.element = _(selector).elem;
        this.items = _(selector).find('.nav-item');
    }
    // Event
    private reset(id?: string) {
        let newItems = this.items;
        if(id)
            newItems = this.items.filter(item => item.id !== id);
        newItems.forEach(item => {
            const holder = _(item);
            if(holder.hasClass('active')) holder.removeClass('active');
        });
    }
    private handleClickOutsideEvent(e: Event): void {
        e.preventDefault();
        const htmlDoc = _(document);
        const items = document.querySelectorAll('.nav-item');
        items.forEach(item => {
            const holder = _(item);
            if (holder.hasClass('active')) holder.removeClass('active');
        });
        htmlDoc.off('click');
    }
    // Init
    init(){
        const self = this;
        const doc = _(document);
        // Clone nav
        const mainMenu = _('#main-menu').clone().attr('id', 'mobile-menu').attr('class','nav-item-holder');
        const toggleMenu = _('#toggleMenu');
        toggleMenu.append(mainMenu.elem);
        this.items.forEach(item => {
            const itemHolder = _(item);
            // console.log(itemHolder);
            if (itemHolder.attr('id')){
                // If item has ID
                const button = itemHolder.children('.nav-link');
                const holder = itemHolder.children('.nav-item-holder');
                if (holder)
                    holder.on('click', e => e.stopPropagation());
                button.on('click', e => {
                    const current = _(e.currentTarget).parent();
                    const currentId = current.attr('id');
                    // Toggle State
                    console.log(currentId);
                    if(currentId !== 'moveToTop'){
                        e.stopPropagation();
                        current.toggleClass('active');
                        self.reset(currentId);
                        doc.on('click', self.handleClickOutsideEvent);
                        return false;
                    }else
                        current.moveToTop(0,500);
                    
                });
            }
        })
    }
}