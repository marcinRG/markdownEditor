import {AppSettings} from '../settings/AppSettings';
import {getHTMLElement} from '../utils/Utilities';

export class LinkInfoDisplay {
    private linkInfoInput: HTMLInputElement;

    constructor(private className: string) {
        this.linkInfoInput = getHTMLElement<HTMLInputElement>(AppSettings.addressInputSelector);
    }

    public showInfo(text: string) {
        if (!this.linkInfoInput.classList.contains(this.className)) {
            this.linkInfoInput.classList.add(this.className);
        }
        this.linkInfoInput.value = text;
    }

    public hideInfo() {
        this.linkInfoInput.classList.remove(this.className);
    }
}
