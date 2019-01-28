import {getHTMLElement} from '../utils/Utilities';
import {AppSettings} from '../settings/AppSettings';
import {IError} from '../model/interfaces/IError';

export class ErrorDisplay {
    private errorTitle: HTMLElement;
    private errorDescription: HTMLElement;

    constructor(private defaultErrorTitle: string = 'Błąd',
                private defaultErrorDescription: string = 'Wystąpił nieokreślony błąd.') {
        this.errorTitle = getHTMLElement(AppSettings.errorTitleSelector);
        this.errorDescription = getHTMLElement(AppSettings.errorDescriptionSelector);
        this.errorTitle.textContent = this.defaultErrorTitle;
        this.errorDescription.textContent = this.defaultErrorDescription;
    }

    public displayError(error: IError) {
        if (error) {
            if (error.title && error.title !== '' && error.title !== ' ') {
                this.errorTitle.textContent = error.title;
            } else {
                this.errorTitle.textContent = this.defaultErrorTitle;
            }
            if (error.description && error.description !== '' && error.description !== ' ') {
                this.errorDescription.textContent = error.description;
            } else {
                this.errorDescription.textContent = this.defaultErrorDescription;
            }
        }
    }
}
