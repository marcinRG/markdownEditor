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
* #### Nagłówki

 ##### gggggggg`;
    const headerTestTextNoMatch = `
 ###Some text
####### To many hashes
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
        expect(match[2]).toBe('Nagłówki');

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
