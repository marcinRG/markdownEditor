import * as Promise from 'bluebird';
import {AppSettings} from './settings/AppSettings';
import {IParse} from './model/interfaces/IParse';
import {IStorage} from './model/interfaces/IStorage';
import {parseService} from './services/parse.service';
import {storageService} from './services/storage.service';
import * as utils from './utils/Utilities';
import {HTMLElementExists} from './utils/Utilities';
import {TabSwitcher} from './ui/tabSwitcher';
import {routerService} from './services/router.service';
import {IDataBase} from './model/interfaces/IDataBase';
import {fireBaseService} from './services/firebase.service';

class App {

    private parser: IParse;
    private storage: IStorage;
    private remoteDatabase: IDataBase;
    private input: HTMLTextAreaElement;
    private output: HTMLElement;
    private tabSwitcher: TabSwitcher;
    private saveButton: HTMLInputElement;
    private uploadButton: HTMLInputElement;
    private addressInput: HTMLInputElement;
    private delay: number;
    private debouncedParseAndAddToOutput: any;
    private key: string = null;

    constructor() {

        this.setHTMLElements();
        this.setAndInitializeTabSwitcher();
        this.delay = AppSettings.debounceTime;
        this.debouncedParseAndAddToOutput = utils.debounce<string>((value) => {
            this.parseAndAddToOutput(value);
        }, this.delay);
    }

    public handleNewEntry(params: any) {
        utils.setEnabled(false, this.input);
        if (this.storage) {
            this.storage.read().then((val) => {
                utils.setValue(val, this.input);
                utils.setEnabled(true, this.input);
                return val;
            }).then((val) => {
                this.parser.parse(val).then((val) => {
                    this.output.innerHTML = (val).toString();
                });
                this.tabSwitcher.show(1);
            });
        }
    }

    public handleError(params: any) {
        console.log('error');
    }

    public handleShowEntry(params: any) {
        console.log('show entry');
    }

    public run() {
        this.addListenerToInputTextArea();
        this.addListenerToSaveButton();
    }

    public setStorage(storage: IStorage) {
        if (storage) {
            this.storage = storage;
        }
    }

    public setParser(parser: IParse) {
        if (parser) {
            this.parser = parser;
        }
    }

    public setRemoteDatabase(dataBase: IDataBase) {
        if (dataBase) {
            this.remoteDatabase = dataBase;
        }
    }

    private addListenerToSaveButton() {
        if (this.saveButton && this.saveButton instanceof HTMLInputElement) {
            this.saveButton.addEventListener('click', () => {
                console.log('button clicked');
                if (this.key) {
                    this.remoteDatabase.updateEntry(this.key, {text: this.input.value}).then(() => {
                        console.log('value updated');
                    });
                } else {
                    this.remoteDatabase.addEntry({
                        text: this.input.value,
                    }).then((key) => {
                        this.key = key;
                        const urlstr = this.remoteDatabase.encodeKey(key);
                        window.history.replaceState('', '',
                            `#/${AppSettings.routeSettings.routes[1]}/id/${urlstr}`);
                        this.addressInput.value = urlstr;
                    });
                }
            });
        }
    }

    private setAndInitializeTabSwitcher() {
        this.tabSwitcher = new TabSwitcher([
            <HTMLElement> document.querySelector(AppSettings.tabLoadingSelector),
            <HTMLElement> document.querySelector(AppSettings.tabAppSelector),
            <HTMLElement> document.querySelector(AppSettings.tabErrorSelector)], AppSettings.tabsClassName);
        this.tabSwitcher.show(0);
    }

    private setHTMLElements() {
        const input = <HTMLTextAreaElement> document.querySelector(AppSettings.textInputQuerySelector);
        const output = <HTMLElement> document.querySelector(AppSettings.textOutputQuerySelector);
        const saveBtn = <HTMLInputElement> document.querySelector(AppSettings.saveButtonSelector);
        const uploadBtn = <HTMLInputElement> document.querySelector(AppSettings.uploadButtonSelector);
        const addressInput = <HTMLInputElement> document.querySelector(AppSettings.adressInputSelector);

        if (HTMLElementExists(input)) {
            this.input = input;
        }

        if (HTMLElementExists(output)) {
            this.output = output;
        }

        if (HTMLElementExists(saveBtn)) {
            this.saveButton = saveBtn;
        }
        if (HTMLElementExists(uploadBtn)) {
            this.uploadButton = uploadBtn;
        }
        if (HTMLElementExists(addressInput)) {
            this.addressInput = addressInput;
        }
    }

    private addListenerToInputTextArea() {
        if (this.input && this.input instanceof HTMLTextAreaElement) {
            this.input.addEventListener('input', () => {
                this.debouncedParseAndAddToOutput(this.input.value);
            });
        }
    }

    private parseAndAddToOutput(val: string) {
        Promise.all([this.storage.save(val), this.parser.parse(val)]).then((result) => {
            this.output.innerHTML = result[1].toString();
        }, (error) => {
            this.output.innerHTML = createErrorMsg('Wystąpił błąd');
        });
    }
}

const createErrorMsg = (txt: string): string => {
    const p = document.createElement('p');
    p.classList.add('error-message');
    p.textContent = txt;
    return p.outerHTML;
};

const app = new App();
app.setParser(parseService);
app.setStorage(storageService);
app.setRemoteDatabase(fireBaseService);
app.run();

routerService.defaultRoute = AppSettings.routeSettings.defaultRoute;
routerService.errorRoute = AppSettings.routeSettings.errorRoute;
routerService.addRouteHandler(AppSettings.routeSettings.routes[0], (params) => {
    app.handleNewEntry(params);
});
routerService.addRouteHandler(AppSettings.routeSettings.routes[1], (params) => {
    app.handleShowEntry(params);
});
routerService.addRouteHandler(AppSettings.routeSettings.errorRoute, (params) => {
    app.handleError(params);
});
routerService.run();
