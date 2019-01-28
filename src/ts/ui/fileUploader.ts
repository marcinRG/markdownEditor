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
        this.addFileUploadHandler();
    }

    public addCallback(callback: any, thisArg: any) {
        this.callback = callback;
        this.thisArg = thisArg;
    }

    private addFileUploadHandler() {
        if (this.fileUploader) {
            this.fileUploader.addEventListener('change', () => {
                this.loadTextFile();
            });
        }
    }

    private loadTextFile() {
        const file: File = this.fileUploader.files[0];
        const fileReader: FileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            this.callback.apply(this.thisArg, [fileReader.result]);
        });
        fileReader.readAsText(file);
    }

    private addButtonHandler() {
        if (this.uploadButton) {
            this.uploadButton.addEventListener('click', () => {
                this.fileUploader.click();
            });
        }
    }
}
