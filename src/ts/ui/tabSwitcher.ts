export class TabSwitcher {
    constructor(public elements: HTMLElement[], public className: string) {
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
