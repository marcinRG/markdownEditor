import {Parser} from './parser/Parser';
import {StorageUtils} from './storage/StorageUtils';

const PARSER_APP_KEY = '_valxy_666999_ParserApp';

export class App {

    private button: HTMLButtonElement;
    private textArea: HTMLTextAreaElement;

    constructor() {
        console.log('constructor start');
        this.textArea = <HTMLTextAreaElement> document.getElementById('text2Parse');
        this.button = <HTMLButtonElement> document.getElementById('appButton');
        this.textArea.value = this.readFromStorage();
        this.addListenerToTextArea();
        this.addListenerToButton();
    }

    private addListenerToTextArea() {
        this.textArea.addEventListener('input', () => {
            this.saveToStorage(this.textArea.value);
        });
    }

    private addListenerToButton() {
        this.button.addEventListener('click', () => {
            this.parseText(this.textArea.value);
        });
    }

    private parseText(text: string): void {
        Parser.parseText(text);
    }

    private saveToStorage(text: string): void {
        StorageUtils.writeValue(PARSER_APP_KEY, text);
    }

    private readFromStorage(): string {
        return StorageUtils.readValue(PARSER_APP_KEY).toString();
    }
}

const app = new App();
