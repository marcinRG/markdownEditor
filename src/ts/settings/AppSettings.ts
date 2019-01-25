export class AppSettings {
    public static debounceTime: number = 2500;
    public static templateText: string = `# Prosty edytor markdown
## edytor markdown z możliwością zapisu do onlineowej bazy danych

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
    public static uploadButtonSelector: string = '#upload';
    public static errorTitleSelector: string = '.error-description';
    public static errorDescriptionSelector: string = '#upload';
    public static tabLoadingSelector: string = '.page.load-page';
    public static tabErrorSelector: string = '.page.error-page';
    public static tabAppSelector: string = '.page.app-page';
    public static adressInputSelector: string = '#adress-text';
    public static tabsClassName: string = 'show';
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
}
