export class AppSettings {
    public static debounceTime: number = 2500;
    public static templateText: string = `# Weekly JavaScript Challenge #9
## Stwórz prosty edytor markdown

Wymagania:
* edycja tekstu w polu powoduje automatyczne renderowanie obok
* obsługa **przynajmniej** podstawowych elementów języka markdown
* tekst powinien się automatycznie zapisywać w przeglądarce
* edytor powinien być funkcjonalny również na urządzeniach mobilnych

Technologia:
* dowolna ze wskazaniem na czysty JS
* dodatkowe utrudnienie: Spróbować zaimplementować obsługę Markdowna samemu bez gotowych bibliotek (nieobowiązkowo)

Zaimplementowano:
* **pogrubienie**
* //kursywa//
* (odnośnik)[http://typeofweb.com/]
* --przekreślenie--
* __podkreslenie__
* listy

Dodatkowo:

> Cytaty
> cytat cd.
> cytat cd 2.
> cytat cd 3;

'''
Tekst niesformatowany
## Nagłówek
* --przekreślenie--
* __podkreslenie__
'''`;
    public static textInputQuerySelector: string = '#text2Parse';
    public static textOutputQuerySelector: string = '#output';
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
