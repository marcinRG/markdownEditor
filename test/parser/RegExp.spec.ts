describe('List element match test', () => {
    const listElemRegExp = /\*\s(.*?)(?:\n|$)/g;
    const testListText = `Zaimplementowano:
 * **pogrubienie**
 * __kursywa__
 * [odnośnik](http://typeofweb.com/)
 * #### Nagłówki
 * --podkreslenie--
 * listy`;

    const testList2Text = `
    Wymagania:
 * edycja tekstu w polu powoduje automatyczne renderowanie obok
 * obsługa **przynajmniej** podstawowych elementów języka markdown
 * tekst powinien się automatycznie zapisywać w przeglądarce
 * edytor powinien być funkcjonalny również na urządzeniach mobilnych

   Technologia:
  * dowolna ze wskazaniem na czysty JS
  * dodatkowe utrudnienie: Spróbować zaimplementować obsługę Markdowna samemu bez gotowych bibliotek (nieobowiązkowo)`;

    beforeEach(() => {
        listElemRegExp.lastIndex = 0;
    });

    it('should match expected result', () => {
        console.log('should match expected result');
        const match = listElemRegExp.exec(testListText);
        expect(match[1]).toBe('**pogrubienie**');
    });

    it('should iterate expected number of times', () => {
        console.log('should iterate expected number of times');
        const textValues = [
            '**pogrubienie**',
            '__kursywa__',
            '[odnośnik](http://typeofweb.com/)',
            '#### Nagłówki',
            '--podkreslenie--',
            'listy',
        ];

        const expectedIterations = 6;
        let i = 0;
        let match = listElemRegExp.exec(testListText);
        while (match !== null) {
            expect(match[1]).toBe(textValues[i]);
            i = i + 1;
            match = listElemRegExp.exec(testListText);
        }
        expect(i).toBe(expectedIterations);
    });

    it('should iterate expected number of times over teststring nr 2', () => {
        console.log('should iterate expected number of test string no 2');
        const expectedIterations = 6;
        let i = 0;
        let match = listElemRegExp.exec(testList2Text);
        while (match !== null) {
            i = i + 1;
            match = listElemRegExp.exec(testList2Text);
        }
        expect(i).toBe(expectedIterations);
    });
});

describe('Header element match test', () => {
    const headerRegExp = /(#{1,6})\s(.*)(?:\n|$)/g;
    //          whole=[0] gr1=[1]  gr2=[2]
    const headerTestText = `
   # Weekly JavaScript Challenge #9
## Stwórz prosty edytor markdown
* #### Nagłówki ## to jest tekst

 ##### gggggggg`;
    const headerTestTextNoMatch = `
 ###Some text
 `;
    beforeEach(() => {
        headerRegExp.lastIndex = 0;
    });

    it('should match expected result', () => {
        console.log('should match expected result');
        let match = headerRegExp.exec(headerTestText);
        expect(match[1].length).toBe(1);
        expect(match[2]).toBe('Weekly JavaScript Challenge #9');

        match = headerRegExp.exec(headerTestText);
        expect(match[1].length).toBe(2);
        expect(match[2]).toBe('Stwórz prosty edytor markdown');

        match = headerRegExp.exec(headerTestText);
        expect(match[1].length).toBe(4);
        expect(match[2]).toBe('Nagłówki ## to jest tekst');

        match = headerRegExp.exec(headerTestText);
        expect(match[1].length).toBe(5);
        expect(match[2]).toBe('gggggggg');

    });
    it('should not match any result', () => {
        console.log('should not match any result');
        const match = headerRegExp.exec(headerTestTextNoMatch);
        expect(match).toBeNull();
    });

});

describe('link element match test', () => {
    const linkRegExp = /\((.*)\)\[((?:https?\:\/\/)?.*)]/g;
    const testLinkText = `  (jakiś tekst)[http://www.onet.pl]`;
    const testLinkText2 = ` (artykuł na wyborcza.pl)[http://wyborcza.pl/7,75400,22586094,` +
        `halloween-u-fizykow-dzien-ciemnej-materii.html] `;
    const testLinkText4 = ` (Rotating Cube)[desandro.github.io/3dtransforms/examples/perspective-03]`;
    const testLinkText5 = ` (マクロスMACROSS 82-99)[https://www.youtube.com/watch?v=idipMrfAZHk]`;

    beforeEach(() => {
        linkRegExp.lastIndex = 0;
    });

    it('should match', () => {
        console.log('should find link and descption 1');
        const match = linkRegExp.exec(testLinkText2);
        expect(match[1]).toBe('artykuł na wyborcza.pl');
        expect(match[2]).toBe('http://wyborcza.pl/7,75400,22586094,halloween-u-fizykow-dzien-ciemnej-materii.html');

    });

    it('should match', () => {
        console.log('should find link and descption 2');
        const match = linkRegExp.exec(testLinkText);
        expect(match[1]).toBe('jakiś tekst');
        expect(match[2]).toBe('http://www.onet.pl');
    });

    it('should match', () => {
        console.log('should find link and descption 3');
        const match = linkRegExp.exec(testLinkText4);
        expect(match[1]).toBe('Rotating Cube');
        expect(match[2]).toBe('desandro.github.io/3dtransforms/examples/perspective-03');
    });

    it('should match', () => {
        console.log('should find link and descption 4');
        const match = linkRegExp.exec(testLinkText5);
        expect(match[1]).toBe('マクロスMACROSS 82-99');
        expect(match[2]).toBe('https://www.youtube.com/watch?v=idipMrfAZHk');
    });
});

describe('list element match test', () => {
    const listRegExp = /((?:\s?\*\s.*?\n|$)+)/i;
    const textToParse = `* tekst1
* tekst2
* tekst3
`;

    beforeEach(() => {
        listRegExp.lastIndex = 0;
    });

    it('should match', () => {
        console.log('should find match for list element');
        const match = listRegExp.exec(textToParse);
        expect(match).toBeDefined();
        expect(match[0]).toBe(textToParse);
    });

});

describe('quote element match test', () => {
    const listRegExp = /((?:>.*?\n|$)+)/i;
    const textToParse = `>tekst1
> tekst2
> tekst3
`;

    beforeEach(() => {
        listRegExp.lastIndex = 0;
    });

    it('should match', () => {
        console.log('should find match qoute element');
        const match = listRegExp.exec(textToParse);
        expect(match).toBeDefined();
        expect(match[0]).toBe(textToParse);
    });

});

describe('pre element match test', () => {
    const preRegExp = /(?:'''\n((?:.|\s)*?)'''\n)/i;
    const markdown = `'''\n`;
    const text = `
    test1
    test2
    test3`;
    const textToParse = `
 ${markdown}${text}${markdown}
    `;
    beforeEach(() => {
        preRegExp.lastIndex = 0;
    });

    it('should match', () => {
        console.log('should find match pre element');
        const match = preRegExp.exec(textToParse);
        expect(match).toBeDefined();
        expect(match[1]).toBe(text);
    });
});