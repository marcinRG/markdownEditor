import * as Promise from 'bluebird';
import {AppSettings} from './settings/AppSettings';
import {IParse} from './model/interfaces/IParse';
import {IStorage} from './model/interfaces/IStorage';
import {parseService} from './services/parse.service';
import {storageService} from './services/storage.service';

class App {

    private button: HTMLButtonElement;
    private input: HTMLTextAreaElement;
    private output: HTMLElement;
    private parser: IParse;
    private storage: IStorage;

    constructor() {
        //this.input = <HTMLTextAreaElement> document.querySelector(AppSettings.textInputQuerySelector);
        //this.output = <HTMLElement> document.querySelector(AppSettings.textOutputQuerySelector);
        //this.button = <HTMLButtonElement> document.querySelector(AppSettings.buttonQuerySelector);
    }

    public setParser(parser: IParse) {
        if (parser) {
            this.parser = parser;
        }
    }

    public setStorage(storage: IStorage) {
        if (storage) {
            this.storage = storage;
        }
    }

    public run() {
        console.log('run');
    }

    //constructor() {
    //     this.textArea = <HTMLTextAreaElement> document.getElementById('text2Parse');
    //     this.button = <HTMLButtonElement> document.getElementById('appButton');
    //     if (this.textArea && this.textArea.value) {
    //         const storedValue = this.readFromStorage();
    //         if (storedValue) {
    //             this.textArea.value = this.readFromStorage();
    //         }
    //
    //     }
    //     this.addListenerToTextArea();
    //     this.addListenerToButton();
    // }
    //
    // private addListenerToTextArea() {
    //     if (this.textArea) {
    //         this.textArea.addEventListener('input', () => {
    //             this.saveToStorage(this.textArea.value);
    //         });
    //     }
    // }
    //
    // private addListenerToButton() {
    //     if (this.button) {
    //         this.button.addEventListener('click', () => {
    //             this.parseText(this.textArea.value);
    //         });
    //     }
    // }
    //
    // private parseText(text: string): void {
    //     console.log(text);
    //     //Parser.parseText(text);
    // }
    //
    // private saveToStorage(text: string): void {
    //     Storage.writeValue(PARSER_APP_KEY, text);
    // }
    //
    // private readFromStorage(): string {
    //     return Storage.readValue(PARSER_APP_KEY).toString();
    // }
}

const app = new App();
app.setParser(parseService);
app.setStorage(storageService);
