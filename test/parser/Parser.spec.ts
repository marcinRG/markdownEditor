import {Parser} from '../../src/ts/services/Parser';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {INode} from '../../src/ts/model/interfaces/INode';
import {IParserRule} from '../../src/ts/model/interfaces/IParserRule';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {Tags} from '../../src/ts/settings/Tags';

describe('Parser tests', () => {

    const parserRules: IParserRule[] = [
        {
            name: Tags.all,
            tagName: HTMLTags.all,
            allowedChildrenNodes: ['header', 'underline', 'strong', 'deleted', 'list'],
            regExpStr: '((?:.*?\\n|$)*)',
            isMultiLine: true,
            textNodeChildrenAllowed: true,
            matchGroups: 1,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        matchedText: matchResult[index],
                        tag: HTMLTags.all,
                        innerText: matchResult[index],
                    };
                }
            },
        },
        {
            name: Tags.header,
            tagName: HTMLTags.header,
            allowedChildrenNodes: ['underline', 'strong', 'deleted'],
            regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
            textNodeChildrenAllowed: true,
            matchGroups: 3,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: HTMLTags.header,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 2],
                        headerSize: matchResult[index + 1].length,
                    };
                }
            },
        },
        {
            name: Tags.strong,
            tagName: HTMLTags.strong,
            allowedChildrenNodes: ['underline', 'link', 'deleted'],
            regExpStr: '(\\*\\*(.*)\\*\\*)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: HTMLTags.strong,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.list,
            tagName: HTMLTags.list,
            allowedChildrenNodes: ['li'],
            regExpStr: '((?:\\s?\\*\\s.*?\\n|$)+)',
            isMultiLine: true,
            matchGroups: 1,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: HTMLTags.list,
                        matchedText: matchResult[index],
                        innerText: matchResult[index],
                    };
                }
            },
        },
        {
            name: Tags.underline,
            tagName: HTMLTags.underline,
            allowedChildrenNodes: [],
            regExpStr: '(__(.*)__)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: HTMLTags.underline,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.deleted,
            tagName: HTMLTags.deleted,
            allowedChildrenNodes: [],
            regExpStr: '(--(.*)--)',
            textNodeChildrenAllowed: true,
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: HTMLTags.deleted,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
    ];
    const parser = new Parser(parserRules);

    it('should exist and have certain properties', () => {
        expect(parser).toBeDefined();
        expect(parser.getRules().length).toBe(6);
        const rule: IParserRule = parser.getParserRule(Tags.header);
        expect(rule).toBeDefined();
        expect(rule.regExpStr).toBe('((#{1,6})\\s(.*)(?:\\n|$))');
        expect(rule.allowedChildrenNodes.length).toBe(3);
        expect(rule.matchGroups).toBe(3);
        const rule2 = parser.getParserRule(Tags.underline);
        const str1 = rule2.regExpStr;
        expect(str1).toBe('(__(.*)__)');
        const str2 = parser.getParserRule(Tags.strong).regExpStr;
        expect(str2).toBe('(\\*\\*(.*)\\*\\*)');
        const str3 = parser.getParserRule(Tags.deleted).regExpStr;
        expect(parser.getAllowedChildrenRegexStr(Tags.header)).toBe(str1 + '|' + str2 + '|' + str3);
    });

    it('should parse text to html tags', () => {
        const textToParse = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const expectedResult = `<${HTMLTags.all}>Jakis tekst <${HTMLTags.header}1>` +
            `Weekly JavaScript Challenge #9</${HTMLTags.header}1></${HTMLTags.all}>`;
        console.log(`expected Result: ${expectedResult}`);
        const node: INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `## Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}><${HTMLTags.H2}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H2}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H3}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H3}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst #### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H4}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H4}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ##### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H5}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H5}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ###### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H6}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H6}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst ####### Weekly JavaScript Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst #<${HTMLTags.H6}>` +
        //     `Weekly JavaScript Challenge #9</${HTMLTags.H6}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst # Weekly **JavaScript** Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H1}>` +
        //     `Weekly <${HTMLTags.B}>JavaScript</${HTMLTags.B}> Challenge #9</${HTMLTags.H1}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst # Weekly __JavaScript__ Challenge #9`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst <${HTMLTags.H1}>` +
        //     `Weekly <${HTMLTags.I}>JavaScript</${HTMLTags.I}> Challenge #9</${HTMLTags.H1}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        // const textToParse = `Jakis tekst (マクロスMACROSS 82-99)[https://www.youtube.com/watch?v=idipMrfAZHk]`;
        // const expectedResult = `<${HTMLTags.DIV}>Jakis tekst ` +
        //     `<${HTMLTags.A} href="https://www.youtube.com/watch?v=idipMrfAZHk">` +
        //     `マクロスMACROSS 82-99</${HTMLTags.A}></${HTMLTags.DIV}>`;
        // console.log(`expected Result: ${expectedResult}`);
        // const parentNode: INode = new TagNode(HTMLTags.DIV);
        // Parser.parseText(textToParse, parentNode);
        // expect(parentNode.toString()).toBe(expectedResult);
    });

    xit('should parse text to html tags', () => {
        //        const textToParse = ` * tekst1
        // * tekst2
        // * tekst3`;
        //        const expectedResult = `<${HTMLTags.DIV}><${HTMLTags.UL}><${HTMLTags.LI}>tekst1</${HTMLTags.LI}>` +
        //            `<${HTMLTags.LI}>tekst2</${HTMLTags.LI}><${HTMLTags.LI}>tekst3</${HTMLTags.LI}>` +
        //            `</${HTMLTags.UL}></${HTMLTags.DIV}>`;
        //        console.log(`expected Result: ${expectedResult}`);
        //        const parentNode: INode = new TagNode(HTMLTags.DIV);
        //        Parser.parseText(textToParse, parentNode);
        //        expect(parentNode.toString()).toBe(expectedResult);
    });

});
