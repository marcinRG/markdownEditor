import {IError} from '../model/interfaces/IError';

export class AppSettings {
    public static debounceTime: number = 2500;
    public static templateText: string = `# Prosty edytor markdown
## edytor markdown z możliwością zapisu do zdalnej bazy danych

Możliwości:
* edycja tekstu w polu powoduje automatyczne renderowanie obok
* obsługa **przynajmniej** podstawowych elementów języka markdown
* tekst powinien się automatycznie zapisywać w przeglądarce
* edytor powinien być funkcjonalny również na urządzeniach mobilnych

Zaimplementowano:
* **pogrubienie**
* //kursywa//
* (odnośnik)[http://typeofweb.com]
* __podkreślenie__
* --przekreślenie--
* listy

Dodatkowo:

>cytaty
>cytat linijka 1
>cytat linijka 2
>cytat linijka 3

'''
Dowolny nie interpretowany tekst
'''`;

    public static textInputQuerySelector: string = '#text2Parse';
    public static textOutputQuerySelector: string = '#output';
    public static saveButtonSelector: string = '#save';
    public static saveButtonTxt: string = 'zapisz';
    public static uploadButtonSelector: string = '#upload';
    public static uploadButtonTxt: string = 'wczytaj z pliku';
    public static fileUploaderSelector: string = '#file-uploader';
    public static inputTabButtonSelector: string = '#input-tab-btn';
    public static outputTabButtonSelector: string = '#output-tab-btn';
    public static inputOutputHideClassName: string = 'hide-input-output';

    public static errorTitleSelector: string = '.error-title';
    public static errorDescriptionSelector: string = '.error-description';

    public static tabLoadingSelector: string = '.page.load-page';
    public static tabErrorSelector: string = '.page.error-page';
    public static tabAppSelector: string = '.page.app-page';
    public static addressInputSelector: string = '#address-text';
    public static showClassName: string = 'show';
    public static appKey: string = '_valxy_666999_ParserApp';
    public static routeSettings = {
        routes: [
            'newEntry',
            'showEntry',
        ],
        defaultRoute: 'newEntry',
        errorRoute: 'error',
    };
    public static fireBaseConfig = {
        apiKey: 'AIzaSyCFm1pmx-GKhniZlCt_vfg7NCm_49z4a4k',
        authDomain: 'markdown-editor-db.firebaseapp.com',
        databaseURL: 'https://markdown-editor-db.firebaseio.com',
        projectId: 'markdown-editor-db',
        storageBucket: 'markdown-editor-db.appspot.com',
        messagingSenderId: '1070468096359',
    };
    public static errorValue: IError = {
        title: 'Nieprawidłowy obiekt',
        description: `Obiekt zwrócony przez bazę danych jest nieprawidłowy`,
    };
    public static errorDatabase: IError = {
        title: 'Błąd bazy danych',
        description: `Błąd podczas łączenia ze zdalną bazą danych`,
    };

    public static errorParameters: IError = {
        title: 'Złe parametry',
        description: 'Parametry zapytania są nieprawidłowe',
    };

    public static errorRoute: IError = {
        title: 'Nieprawidłowa trasa',
        description: 'Parametry zapytania są nieprawidłowe',
    };

    public static databaseEntryUpdateInfo = 'zaktualizowano wpis w sieciowej bazie danych';
    public static errorMsg = 'Wystąpił błąd';
}
