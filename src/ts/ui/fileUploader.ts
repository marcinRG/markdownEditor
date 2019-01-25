import {getHTMLElement} from '../utils/Utilities';
import {AppSettings} from '../settings/AppSettings';

export class FileUploader {
    private fileUploader: HTMLInputElement;
    private uploadButton: HTMLInputElement;
    private callback: any;
    private thisArg: any;

    constructor() {
        this.fileUploader = getHTMLElement<HTMLInputElement>(AppSettings.fileUploaderSelector);
        this.uploadButton = getHTMLElement<HTMLInputElement>(AppSettings.uploadButtonSelector);
        this.uploadButton.value = AppSettings.uploadButtonTxt;
        this.addButtonHandler();
    }

    public addCallBack(callback: any, thisArg: any) {
        this.callback = callback;
        this.thisArg = thisArg;
    }

    private addButtonHandler() {
        if (this.uploadButton) {
            this.uploadButton.addEventListener('click', () => {
                this.fileUploader.click();
            });
        }
    }
}
