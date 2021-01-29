import { Utillity } from './utillity.js';

export class MobileNav {
    element: Element;
    items: Array<Element>;
    constructor(selector: string){
        this.element = document.querySelector(selector);
        this.items = Array.prototype.slice.call(this.element.querySelectorAll('.nav-item'));
    }
    // Event
    private reset(id?: string) {
        let newItems = this.items;
        if(id){
            newItems = this.items.filter(item => {
                return item.id !== id;
            });
        }
        newItems.forEach(item => {
            const holder = new Utillity(item);
            if(holder.hasClass('active')) {
                // Remove All other active state
                holder.removeClass('active');
            }
        });
    }
    private handleToggleSearch(target){
    }
    private handleToggleMenu(target) {
    }
    private handleToggleContact(target) {
    }
    private handleClickOutsideEvent(elem) {
        console.log(elem);
    }
    // Init
    init(){
        const self = this;
        this.items.forEach(item => {
            const itemHolder = new Utillity(item);
            if (itemHolder.attr('id')){
                // If item has ID
                const button = itemHolder.elem.querySelector('.nav-link');
                button.addEventListener('click', e => {
                    e.stopPropagation();
                    const current = new Utillity(e.currentTarget).parent();
                    const currentId = current.attr('id');
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
        })
    }
}