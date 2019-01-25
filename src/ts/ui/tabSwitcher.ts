import {getHTMLElement} from '../utils/Utilities';

export class TabSwitcher {
    private elements: HTMLElement[] = [];

    constructor(public elementsSelectors: string[], public className: string, selected: number = 0) {
        if (elementsSelectors && elementsSelectors.length) {
            for (const elemSelector of elementsSelectors) {
                const elem = getHTMLElement<HTMLElement>(elemSelector);
                this.elements.push(elem);
            }
        }
        this.show(selected);
    }

    public hideAll() {
        for (const elem of this.elements) {
            elem.classList.remove(this.className);
        }
    }

    public show(i) {
        this.hideAll();
        if (i >= 0 && i < this.elements.length) {
            if (this.elements && this.elements[i]) {
                this.elements[i].classList.add(this.className);
            }
        }
    }
}
