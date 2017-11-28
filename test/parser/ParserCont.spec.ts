import {Parser} from '../../src/ts/services/Parser';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {IParserRule} from '../../src/ts/model/interfaces/IParserRule';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {Tags} from '../../src/ts/settings/Tags';
import {INode} from '../../src/ts/model/interfaces/INode';
import {ITag} from '../../src/ts/model/interfaces/ITag';

describe('Parser tests', () => {

    const parserRules: IParserRule[] = [
        {
            name: Tags.all,
            allowedChildrenNodes: [Tags.header, Tags.underline, Tags.strong, Tags.deleted, Tags.link, Tags.list],
            regExpStr: '((?:.*?\\n|$)*)',
            isMultiLine: true,
            textNodeChildrenAllowed: true,
            matchGroups: 1,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        matchedText: matchResult[index],
                        tag: Tags.all,
                        innerText: matchResult[index],
                    };
                }
            },
        },
        {
            name: Tags.header,
            allowedChildrenNodes: ['underline', 'strong', 'deleted'],
            regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
            textNodeChildrenAllowed: true,
            matchGroups: 3,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.header,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 2],
                        headerSize: matchResult[index + 1].length,
                    };
                }
            },
        },
        {
            name: Tags.strong,
            allowedChildrenNodes: [Tags.underline, Tags.deleted, Tags.link],
            regExpStr: '(\\*\\*(.*)\\*\\*)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.strong,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.list,
            allowedChildrenNodes: [Tags.listElement],
            regExpStr: '(((?:\\s?\\*\\s.*?(?:\\n|$)))+)',
            isMultiLine: true,
            matchGroups: 1,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.list,
                        matchedText: matchResult[index],
                        innerText: matchResult[index],
                    };
                }
            },
        },
        {
            name: Tags.listElement,
            allowedChildrenNodes: [Tags.underline, Tags.link, Tags.deleted, Tags.strong],
            regExpStr: '((?:\\s?\\*\\s(.*?)(?:\\n|$)))',
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.listElement,
                        matchedText: matchResult[index],
                        innerText: matchResult[index+1],
                    };
                }
            },
        },
        {
            name: Tags.underline,
            allowedChildrenNodes: [Tags.strong, Tags.deleted, Tags.link],
            regExpStr: '(__(.*)__)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.underline,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.deleted,
            allowedChildrenNodes: [Tags.strong, Tags.link, Tags.underline],
            regExpStr: '(--(.*)--)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.deleted,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.link,
            allowedChildrenNodes: [Tags.deleted, Tags.strong, Tags.underline],
            regExpStr: '(\\((.*)\\)\\[((?:https?\\:\\/\\/)?.*)])',
            textNodeChildrenAllowed: true,
            matchGroups: 3,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.link,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                        link: matchResult[index + 2]
                    };
                }
            },
        },
    ];
    const tags: ITag[] = [
        {
            tag: Tags.all,
            htmlTag: HTMLTags.div,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h1,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h2,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h3,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h4,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h5,
        },
        {
            tag: Tags.header,
            htmlTag: HTMLTags.h6,
        },
        {
            tag: Tags.list,
            htmlTag: HTMLTags.ul,
        },
        {
            tag: Tags.listElement,
            htmlTag: HTMLTags.li,
        },
        {
            tag: Tags.underline,
            htmlTag: HTMLTags.underline,
        },
        {
            tag: Tags.strong,
            htmlTag: HTMLTags.strong,
        },
        {
            tag: Tags.link,
            htmlTag: HTMLTags.a,
        },
    ];
    const parser = new Parser(parserRules, tags);

    it('should exist and have certain properties', () => {
        const testList2Text = `
    Wymagania:
 * edycja tekstu w polu powoduje automatyczne renderowanie obok
 * obsługa **przynajmniej** podstawowych elementów języka markdown
 * tekst powinien się automatycznie zapisywać w przeglądarce
 * edytor powinien być funkcjonalny również na urządzeniach mobilnych

   Technologia:
  * dowolna ze wskazaniem na czysty JS
  * dodatkowe utrudnienie: Spróbować zaimplementować obsługę Markdowna samemu bez gotowych bibliotek (nieobowiązkowo)`;
        const node: INode = parser.parse(testList2Text);
        console.log(node.toString());
        expect(node.toString()).toBeDefined();

    });

});
