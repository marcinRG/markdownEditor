// import * as Promise from 'bluebird';
// import {AppSettings} from './settings/AppSettings';
// import {IParse} from './model/interfaces/IParse';
// import {IStorage} from './model/interfaces/IStorage';
// import {parseService} from './services/parse.service';
// import {storageService} from './services/storage.service';
// import * as utils from './utils/Utilities';
//
// class App {
//
//     private input: HTMLTextAreaElement;
//     private output: HTMLElement;
//     private parser: IParse;
//     private storage: IStorage;
//     private delay: number;
//     private debouncedParseAndAddToOutput: any;
//
//     constructor() {
//         this.input = <HTMLTextAreaElement> document.querySelector(AppSettings.textInputQuerySelector);
//         this.output = <HTMLElement> document.querySelector(AppSettings.textOutputQuerySelector);
//         this.delay = AppSettings.debounceTime;
//         this.debouncedParseAndAddToOutput = utils.debounce<string>((value) => {
//             this.parseAndAddToOutput(value);
//         }, this.delay);
//     }
//
//     public setParser(parser: IParse) {
//         if (parser) {
//             this.parser = parser;
//         }
//     }
//
//     public setStorage(storage: IStorage) {
//         if (storage) {
//             this.storage = storage;
//         }
//     }
//
//     public run() {
//         this.addListenerToInputTextArea();
//         utils.setEnabled(false, this.input);
//         this.storage.read().then((val) => {
//             utils.setValue(val, this.input);
//             utils.setEnabled(true, this.input);
//             return val;
//         }).then((val) => {
//             this.parser.parse(val).then((val) => {
//                 this.output.innerHTML = (val).toString();
//             });
//         });
//     }
//
//     private addListenerToInputTextArea() {
//         if (this.input && this.input instanceof HTMLTextAreaElement) {
//             this.input.addEventListener('input', () => {
//                 this.debouncedParseAndAddToOutput(this.input.value);
//             });
//         }
//     }
//
//     private parseAndAddToOutput(val: string) {
//         Promise.all([this.storage.save(val), this.parser.parse(val)]).then((result) => {
//             this.output.innerHTML = result[1].toString();
//         }, (error) => {
//             this.output.innerHTML = createErrorMsg('Wystąpił błąd');
//         });
//     }
// }
//
// const createErrorMsg = (txt: string): string => {
//     const p = document.createElement('p');
//     p.classList.add('error-message');
//     p.textContent = txt;
//     return p.outerHTML;
// };
//
// const app = new App();
// app.setParser(parseService);
// app.setStorage(storageService);
// app.run();
