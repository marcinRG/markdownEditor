import {getHTMLElement} from '../utils/Utilities';
import {AppSettings} from '../settings/AppSettings';

export class InputOutputSwitch {
    private inputTab;
    private outputTab;
    private inputTabButton;
    private outputTabButton;
    private className = AppSettings.inputOutputHideClassName;

    constructor() {
        this.inputTabButton = <HTMLElement> getHTMLElement(AppSettings.inputTabButtonSelector);
        this.outputTabButton = <HTMLElement> getHTMLElement(AppSettings.outputTabButtonSelector);
        this.inputTab = <HTMLElement> getHTMLElement(AppSettings.textInputQuerySelector);
        this.outputTab = <HTMLElement> getHTMLElement(AppSettings.textOutputQuerySelector);
        this.addClickHandlers();
    }

    private addClickHandlers() {
        if (this.inputTab && this.inputTabButton && this.outputTab && this.outputTabButton) {
            this.inputTabButton.addEventListener('click', () => {
                this.inputTab.classList.remove(this.className);
                this.outputTab.classList.add(this.className);
            });

            this.outputTabButton.addEventListener('click', () => {
                this.outputTab.classList.remove(this.className);
                this.inputTab.classList.add(this.className);
            });
        }
    }
}
