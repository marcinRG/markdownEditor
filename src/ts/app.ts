import * as Promise from 'bluebird';
import {AppSettings} from './settings/AppSettings';
import {IParse} from './model/interfaces/IParse';
import {IStorage} from './model/interfaces/IStorage';
import {parseService} from './services/parse.service';
import {storageService} from './services/storage.service';
import * as utils from './utils/Utilities';
import {TabSwitcher} from './ui/tabSwitcher';
import {routerService} from './services/router.service';
import {IDataBase} from './model/interfaces/IDataBase';
import {fireBaseService} from './services/firebase.service';
import {ErrorDisplay} from './ui/errorDisplay';
import {LinkInfoDisplay} from './ui/linkInfoDisplay';
import {FileUploader} from './ui/fileUploader';

class App {

    private parser: IParse;
    private storage: IStorage;
    private remoteDatabase: IDataBase;
    private input: HTMLTextAreaElement;
    private output: HTMLElement;
    private saveButton: HTMLInputElement;
    private tabSwitcher: TabSwitcher;
    private errorDisplay: ErrorDisplay;
    private linkInfoDisplay: LinkInfoDisplay;
    private fileUploader: FileUploader;
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
        console.log('new');
        console.log(params);
        utils.setEnabled(false, this.input);
        this.linkInfoDisplay.hideInfo();
        this.key = null;
        if (this.storage) {
            this.storage.read().then((val) => {
                utils.setValue(val, this.input);
                utils.setEnabled(true, this.input);
                return val;
            }).then((val) => {
                this.parser.parse(val).then((val) => {
                    this.output.innerHTML = (val).toString();
                    this.tabSwitcher.show(1);
                    this.changeURLText(`#/${AppSettings.routeSettings.defaultRoute}`);
                });
            });
        }
    }

    public handleError(params: any) {
        console.log('error');
        console.log(params);
        this.changeURLText(`#/${AppSettings.routeSettings.errorRoute}`);
        this.tabSwitcher.show(2);
        this.errorDisplay.displayError(params);
    }

    public handleShowEntry(params: any) {
        console.log('entry');
        console.log(params);
        this.tabSwitcher.show(0);
        if (utils.requestParamsValid(params)) {
            this.key = this.remoteDatabase.decodeKey(params.id);
            this.remoteDatabase.getEntry(params.id).then((value) => {
                if (utils.databaseQueryValid(value)) {
                    this.showExistingEntry(value);
                } else {
                    this.handleError(AppSettings.errorValue);
                }
            }).catch(() => {
                this.handleError(AppSettings.errorDatabase);
            });
        } else {
            this.handleError(AppSettings.errorParameters);
        }
    }

    public run() {
        this.addListenerToInputTextArea();
        this.addListenerToSaveButton();
        this.errorDisplay = new ErrorDisplay();
        this.linkInfoDisplay = new LinkInfoDisplay(AppSettings.showClassName);
        this.fileUploader = new FileUploader();
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

    private showExistingEntry(value: { text: string }) {
        this.input.value = value.text;
        this.parseAndAddToOutput(this.input.value);
        this.tabSwitcher.show(1);
    }

    private changeURLText(url: string) {
        window.history.replaceState('', '', url);
    }

    private addListenerToSaveButton() {
        if (this.saveButton && this.saveButton instanceof HTMLInputElement) {
            this.saveButton.addEventListener('click', () => {
                if (this.key) {
                    this.remoteDatabase.updateEntry(this.key, {text: this.input.value}).then(() => {
                        this.linkInfoDisplay.showInfo(AppSettings.databaseEntryUpdateInfo);
                    });
                } else {
                    this.remoteDatabase.addEntry({
                        text: this.input.value,
                    }).then((key) => {
                        this.onDataBaseEntrySave(key);
                    });
                }
            });
        }
    }

    private onDataBaseEntrySave(key: string) {
        this.key = key;
        const urlstr = this.remoteDatabase.encodeKey(key);
        this.changeURLText(`#/${AppSettings.routeSettings.routes[1]}/id/${urlstr}`);
        this.linkInfoDisplay.showInfo(window.location.href);
    }

    private setAndInitializeTabSwitcher() {
        this.tabSwitcher = new TabSwitcher([
            AppSettings.tabLoadingSelector,
            AppSettings.tabAppSelector,
            AppSettings.tabErrorSelector], AppSettings.showClassName);
    }

    private setHTMLElements() {
        this.input = utils.getHTMLElement<HTMLTextAreaElement>(AppSettings.textInputQuerySelector);
        this.output = utils.getHTMLElement<HTMLElement>(AppSettings.textOutputQuerySelector);
        this.saveButton = utils.getHTMLElement<HTMLInputElement>(AppSettings.saveButtonSelector);
        this.saveButton.value = AppSettings.saveButtonTxt;
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
            this.output.innerHTML = utils.createErrorMsg(AppSettings.errorMsg);
        });
    }
}

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
