import {Parser} from '../../src/ts/utils/Parser';
import {ParserRules} from '../../src/ts/settings/ParserRules';
import {TagsArray} from '../../src/ts/settings/TagsArray';
import {INode} from '../../src/ts/model/interfaces/INode';
import {NodeFactory} from '../../src/ts/utils/NodeFactory';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {Tags} from '../../src/ts/settings/Tags';
import {IParserRule} from '../../src/ts/model/interfaces/IParserRule';
import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {ITag} from '../../src/ts/model/interfaces/ITag';
import {ICreateNode} from '../../src/ts/model/interfaces/ICreateNode';

describe('Parser tests', () => {
    it('should work as expected', () => {
        const parser: Parser = new Parser(ParserRules.rules, TagsArray.tags, new NodeFactory());

        const textToParse1 = `Jakis tekst # Weekly JavaScript Challenge #9`;
        const node1: INode = parser.parse(textToParse1);
        expect(node1).toBeDefined();

        const textToParse2 = `Jakis tekst **JavaScript** Challenge #9`;
        const node2: INode = parser.parse(textToParse2);
        expect(node2).toBeDefined();

        const textToParse3 = `Jakis tekst __JavaScript__ Challenge #9`;
        const node3: INode = parser.parse(textToParse3);
        expect(node3).toBeDefined();

        const textToParse4 = `Jakis tekst (マクロスMACROSS 82-99)[https://www.youtube.com/watch?v=idipMrfAZHk]`;
        const node4: INode = parser.parse(textToParse4);
        expect(node4).toBeDefined();

        const textToParse5 = ` * tekst1
 * tekst2
 * tekst3`;
        const node5: INode = parser.parse(textToParse5);
        expect(node5).toBeDefined();

        const textToParse6 = `'''
Jakis tekst
//costam//
inny tekst
'''`;
        const node6: INode = parser.parse(textToParse6);
        expect(node6).toBeDefined();

        const textToParse7 = `>Jakis tekst
>costam
>inny tekst`;
        const node7: INode = parser.parse(textToParse7);
        expect(node7).toBeDefined();

        const textToParse8 = `Jakis tekst //something// end`;
        const node8: INode = parser.parse(textToParse8);
        expect(node8).toBeDefined();

        const textToParse9 = `begin --something-- end`;
        const node9: INode = parser.parse(textToParse9);
        expect(node9).toBeDefined();
    });
});

describe('Parser tests when something goes wrong', () => {
    it('should work, even when tags array is incomplete', () => {
        const parserRules: IParserRule[] = [
            {
                name: Tags.all,
                allowedChildrenNodes: [Tags.header, Tags.underline, Tags.strong, Tags.deleted],
                regExpStr: '((?:.*?\\n|$)+)',
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
                name: Tags.strong,
                allowedChildrenNodes: [Tags.underline, Tags.deleted, Tags.link, Tags.em],
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
                allowedChildrenNodes: [Tags.strong, Tags.underline],
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
        ];
        const tags: ITag[] = [
            {
                tag: Tags.all,
                htmlTag: HTMLTags.div,
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
                tag: Tags.em,
                htmlTag: HTMLTags.em
            },
        ];
        const tagsFactory = new NodeFactory();

        const parser: Parser = new Parser(parserRules, tags, tagsFactory);
        expect(parser.getParserRuleByTag(Tags.pre)).toBeNull();
        expect(parser.getParserRuleByHTMLTag(HTMLTags.del)).toBeNull();
        const textToParse = `begin --**something**-- end`;
        const expectedResult = `<${HTMLTags.div}>begin <${HTMLTags.del}>**something**</${HTMLTags.del}> end</${HTMLTags.div}>`;
        const node:INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);

    });

    it('should work, even when tagsFactory does not return value for tag', () => {
        const parserRules: IParserRule[] = [
            {
                name: Tags.all,
                allowedChildrenNodes: [Tags.header, Tags.underline, Tags.strong, Tags.deleted],
                regExpStr: '((?:.*?\\n|$)+)',
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
                name: Tags.strong,
                allowedChildrenNodes: [Tags.underline, Tags.deleted, Tags.link, Tags.em],
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
                allowedChildrenNodes: [Tags.strong, Tags.underline],
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
        ];
        const tags: ITag[] = [
            {
                tag: Tags.all,
                htmlTag: HTMLTags.div,
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
                tag: Tags.em,
                htmlTag: HTMLTags.em
            },
            {
                tag: Tags.deleted,
                htmlTag: HTMLTags.del
            },
        ];
        const tagsFactory:ICreateNode ={
           createNode : (matchResults: IMatchResult): INode => {
               return null;
           }
        };

        const parser: Parser = new Parser(parserRules, tags, tagsFactory);
        const textToParse = `begin --**something**-- end`;
        const expectedResult = `<${HTMLTags.div}>begin --**something**-- end</${HTMLTags.div}>`;
        const node:INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);

    });

    it('should work, even when all allowedChildrenNodes are wrong', () => {
        const parserRules: IParserRule[] = [
            {
                name: Tags.all,
                allowedChildrenNodes: [Tags.header, Tags.underline, Tags.strong, Tags.deleted],
                regExpStr: '((?:.*?\\n|$)+)',
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
                name: Tags.strong,
                allowedChildrenNodes: [Tags.link, Tags.list, Tags.em],
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
        ];
        const tags: ITag[] = [
            {
                tag: Tags.all,
                htmlTag: HTMLTags.div,
            },
            {
                tag: Tags.list,
                htmlTag: HTMLTags.ul,
            },
            {
                tag: Tags.strong,
                htmlTag: HTMLTags.strong,
            },
            {
                tag: Tags.link,
                htmlTag: HTMLTags.a
            },
            {
                tag: Tags.em,
                htmlTag: HTMLTags.em
            },
        ];
        const tagsFactory = new NodeFactory();
        const parser: Parser = new Parser(parserRules, tags, tagsFactory);
        const textToParse = `begin ** --some-- thing and //something// else ** end`;
        const expectedResult = `<${HTMLTags.div}>begin <${HTMLTags.strong}> --some-- thing and //something// else </${HTMLTags.strong}> end</${HTMLTags.div}>`;
        const node:INode = parser.parse(textToParse);
        expect(node.toString()).toBe(expectedResult);

    });

});
