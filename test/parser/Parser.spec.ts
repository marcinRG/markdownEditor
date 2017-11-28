import {Parser} from '../../src/ts/services/Parser';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {IParserRule} from '../../src/ts/model/interfaces/IParserRule';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {Tags} from '../../src/ts/settings/Tags';
import {INode} from '../../src/ts/model/interfaces/INode';
import {ITag} from '../../src/ts/model/interfaces/ITag';
import {Property} from '../../src/ts/model/Property';

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
        expect(parser).toBeDefined();
        expect((parser.getRules().length > 0)).toBeTruthy();
        const rule: IParserRule = parser.getParserRuleByTag(Tags.header);
        expect(rule).toBeDefined();
        expect(rule.regExpStr).toBe('((#{1,6})\\s(.*)(?:\\n|$))');
        expect(rule.allowedChildrenNodes.length).toBe(3);
        expect(rule.matchGroups).toBe(3);
        const rule2 = parser.getParserRuleByTag(Tags.underline);
        const str1 = rule2.regExpStr;
        expect(str1).toBe('(__(.*)__)');
        const str2 = parser.getParserRuleByTag(Tags.strong).regExpStr;
        expect(str2).toBe('(\\*\\*(.*)\\*\\*)');
        const str3 = parser.getParserRuleByTag(Tags.deleted).regExpStr;
        expect(str3).toBe('(--(.*)--)');
        expect(parser.getAllowedChildrenRegexStr(Tags.header)).toBe(str1 + '|' + str2 + '|' + str3);
        const tags = parser.getTags();
        expect(tags).toBeDefined();

        const rule3 = parser.getParserRuleByHTMLTag(HTMLTags.h1);
        expect(rule3).toBeDefined();
        expect(rule3.regExpStr).toBe(rule.regExpStr);
    });

    it('should parse text to div with header h1', () => {
        const textToParse = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.div}>Jakis tekst <${HTMLTags.h1}>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.h1}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to div with h2 header', () => {
        const textToParse = `## Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.div}><${HTMLTags.h2}>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.h2}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to div with h6', () => {
        const textToParse = `Jakis tekst ###### Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.div}>Jakis tekst <${HTMLTags.h6}>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.h6}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to div with h6 pt no.2', () => {
        const textToParse = `Jakis tekst ####### Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.div}>Jakis tekst #<${HTMLTags.h6}>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.h6}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to html tags', () => {
        const textToParse = `Jakis tekst # Weekly **JavaScript** Challenge #9`;
        const expectedResult = `<${HTMLTags.div}>Jakis tekst <${HTMLTags.h1}>` +
            `Weekly <${HTMLTags.strong}>JavaScript</${HTMLTags.strong}> Challenge #9</${HTMLTags.h1}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to html tags', () => {
        const textToParse = `Jakis tekst __JavaScript__ Challenge #9`;
        const property = new Property('class', 'underline');
        const expectedResult = `<${HTMLTags.div}>Jakis tekst ` +
            `<${HTMLTags.underline}${property.toString()}>JavaScript</${HTMLTags.underline}> Challenge #9</${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    it('should parse text to html tags', () => {
        const textToParse = `Jakis tekst (マクロスMACROSS 82-99)[https://www.youtube.com/watch?v=idipMrfAZHk]`;
        const expectedResult = `<${HTMLTags.div}>Jakis tekst ` +
            `<${HTMLTags.a} href="https://www.youtube.com/watch?v=idipMrfAZHk">` +
            `マクロスMACROSS 82-99</${HTMLTags.a}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

   it('should parse text to html tags', () => {
                const textToParse = ` * tekst1
 * tekst2
 * tekst3`;
        const expectedResult = `<${HTMLTags.div}><${HTMLTags.ul}><${HTMLTags.li}>tekst1</${HTMLTags.li}>` +
                   `<${HTMLTags.li}>tekst2</${HTMLTags.li}><${HTMLTags.li}>tekst3</${HTMLTags.li}>` +
                   `</${HTMLTags.ul}></${HTMLTags.div}>`;
        console.log(`expected Result: ${expectedResult}`);
       const node: INode = parser.parse(textToParse);
       expect(node.toString()).toBe(expectedResult);
    });

});
