import { StorageUtils } from './storage/StorageUtils';

const PARSER_APP_KEY = '_valxy_666999_ParserApp';

export class App {

    private button: HTMLButtonElement;
    private textArea: HTMLTextAreaElement;

    constructor() {
        this.textArea = <HTMLTextAreaElement> document.getElementById('text2Parse');
        this.button = <HTMLButtonElement> document.getElementById('appButton');
        if (this.textArea && this.textArea.value) {
            const storedValue = this.readFromStorage();
            if (storedValue) {
                this.textArea.value = this.readFromStorage();
            }

        }
        this.addListenerToTextArea();
        this.addListenerToButton();
    }

    private addListenerToTextArea() {
        if (this.textArea) {
            this.textArea.addEventListener('input', () => {
                this.saveToStorage(this.textArea.value);
            });
        }
    }

    private addListenerToButton() {
        if (this.button) {
            this.button.addEventListener('click', () => {
                this.parseText(this.textArea.value);
            });
        }
    }

    private parseText(text: string): void {
        console.log(text);
        //Parser.parseText(text);
    }

    private saveToStorage(text: string): void {
        StorageUtils.writeValue(PARSER_APP_KEY, text);
    }

    private readFromStorage(): string {
        return StorageUtils.readValue(PARSER_APP_KEY).toString();
    }
}

const app = new App();
