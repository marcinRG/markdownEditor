import {HTMLTags} from '../../src/ts/settings/HTMLTags';
import {ITag} from '../../src/ts/model/interfaces/ITag';
import {Tags} from '../../src/ts/settings/Tags';
import {IMatchResult} from '../../src/ts/model/interfaces/IMatchResult';
import {IParserRule} from '../../src/ts/model/interfaces/IParserRule';
import {
    findInArray, findParserRuleWithHTMLTag, findParserRuleWithTag,
    findRegexStrWithTag, getAllAllowedChildrenRegexStr
} from '../../src/ts/utils/TagsRulesUtils';

describe('TagRulesUtils tests', () => {
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
        {
            tag: Tags.pre,
            htmlTag: HTMLTags.pre,
        },
        {
            tag: Tags.blockQuote,
            htmlTag: HTMLTags.blockquote,
        },
        {
            tag: Tags.quote,
            htmlTag: HTMLTags.quote,
        },
        {
            tag: Tags.em,
            htmlTag: HTMLTags.em,
        },
        {
            tag: Tags.deleted,
            htmlTag: HTMLTags.del,
        },
    ];

    const rules: IParserRule[] = [
        {
            name: Tags.all,
            allowedChildrenNodes: [Tags.header, Tags.underline, Tags.strong, Tags.deleted, Tags.link,
                Tags.list, Tags.blockQuote, Tags.em, Tags.pre],
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
            name: Tags.header,
            allowedChildrenNodes: ['underline', 'strong', 'deleted'],
            regExpStr: '((#{1,6})\\s(.*)(?:\\n|$))',
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
            allowedChildrenNodes: [Tags.underline, Tags.deleted, Tags.link, Tags.em],
            regExpStr: '(\\*\\*(.*)\\*\\*)',
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
            regExpStr: '((?:\\s?\\*\\s.*?(?:\\n|$))+)',
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
            allowedChildrenNodes: [Tags.underline, Tags.link, Tags.deleted, Tags.strong, Tags.em],
            regExpStr: '(\\s?\\*\\s(.*?)(?:\\n|$))',
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.listElement,
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
            allowedChildrenNodes: [],
            regExpStr: '(\\((.*)\\)\\[((?:https?\\:\\/\\/)?.*)])',
            matchGroups: 3,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.link,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                        link: matchResult[index + 2],
                    };
                }
            },
        },
        {
            name: Tags.blockQuote,
            allowedChildrenNodes: [Tags.quote],
            regExpStr: '((?:>.*?(?:\\n|$))+)',
            matchGroups: 1,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.blockQuote,
                        matchedText: matchResult[index],
                        innerText: matchResult[index],
                    };
                }
            },
        },
        {
            name: Tags.quote,
            allowedChildrenNodes: [Tags.strong, Tags.deleted, Tags.underline, Tags.em, Tags.link],
            regExpStr: '(>(.*?)(?:\\n|$))',
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.quote,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.pre,
            allowedChildrenNodes: [],
            regExpStr: '((?:\'\'\'\\n?)((?:.|\\s)*?)(?:\'\'\'\\n?))',
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.pre,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
        {
            name: Tags.em,
            allowedChildrenNodes: [Tags.strong, Tags.deleted, Tags.underline, Tags.link],
            regExpStr: '(\\/\\/(.*)\\/\\/)',
            matchGroups: 2,
            values: (matchResult: RegExpMatchArray, index: number): IMatchResult => {
                if (matchResult[index]) {
                    return {
                        tag: Tags.em,
                        matchedText: matchResult[index],
                        innerText: matchResult[index + 1],
                    };
                }
            },
        },
    ];

    it('should find proper index', () => {

        const index = findInArray(Tags.strong, 'name', rules);
        expect(index).toBe(2);
        const indexFalse = findInArray('input', 'name', rules);
        expect(indexFalse).toBe(-1);

        const indexTag = findInArray(HTMLTags.h1, 'htmlTag', tags);
        expect(indexTag).toBe(1);
    });

    it('should find parser rule in ParserRules table with htmlTag ', () => {
        const htmlTag = HTMLTags.del;
        const rule = findParserRuleWithHTMLTag(htmlTag, tags, rules);
        expect(rule.name).toBe(Tags.deleted);
        expect(rule.regExpStr).toBe('(--(.*)--)');

        const htmlTagFalse = 'input';
        const ruleFalse = findParserRuleWithHTMLTag(htmlTagFalse, tags, rules);
        expect(ruleFalse).toBeNull();
    });

    it('should find parser rule with tag', () => {
        const tag = Tags.quote;
        const rule = findParserRuleWithTag(tag, rules);
        expect(rule.name).toBe(tag);
        expect(rule.regExpStr).toBe('(>(.*?)(?:\\n|$))');

        const ruleFalse = findParserRuleWithTag('something', rules);
        expect(ruleFalse).toBeNull();
    });

    it('should return RegEx string for specified Tag ', () => {
        const tag = Tags.quote;
        const str = findRegexStrWithTag(tag, rules);
        expect(str).toBe('(>(.*?)(?:\\n|$))');
        const tagFalse = 'input';
        const strFalse = findRegexStrWithTag(tagFalse, rules);
        expect(strFalse).toBeNull();
    });

    it('should return regExpStr of all elements in allowedChildrenNodes table for ' +
        'specified Tag and join them into one string', () => {
        const tag = Tags.quote;
        const regexStrResult = getAllAllowedChildrenRegexStr(tag, rules);
        //allowedChildrenNodes [Tags.strong, Tags.deleted, Tags.underline, Tags.em, Tags.link]
        const expectedResult = findRegexStrWithTag(Tags.strong, rules) + '|' +
            findRegexStrWithTag(Tags.deleted, rules) + '|' +
            findRegexStrWithTag(Tags.underline, rules) + '|' +
            findRegexStrWithTag(Tags.em, rules) + '|' +
            findRegexStrWithTag(Tags.link, rules);
        expect(regexStrResult).toBe(expectedResult);
    });

    it('should return value when there is a tag in allowedChildrenNodes,' +
        ' for witch, there is no entry in rules table', () => {

        const addtionalTag = 'additional';
        const tagWithoutRule = ' tag not defined';
        const additionalRule = {
            name: addtionalTag,
            allowedChildrenNodes: [Tags.strong, Tags.deleted, Tags.underline, tagWithoutRule, Tags.em, Tags.link],
            regExpStr: '((?:\\s?\\*\\s.*?(?:\\n|$))+)',
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
        };
        rules.push(additionalRule);
        const ruleFalse1 = findParserRuleWithTag(tagWithoutRule, rules);
        expect(ruleFalse1).toBeNull();
        const regexStrResult = getAllAllowedChildrenRegexStr(addtionalTag, rules);
        const expectedResult = findRegexStrWithTag(Tags.strong, rules) + '|' +
            findRegexStrWithTag(Tags.deleted, rules) + '|' +
            findRegexStrWithTag(Tags.underline, rules) + '|' +
            findRegexStrWithTag(Tags.em, rules) + '|' +
            findRegexStrWithTag(Tags.link, rules);
        expect(regexStrResult).toBe(expectedResult);
        rules.pop();
        const ruleFalse = findParserRuleWithTag(addtionalTag, rules);
        expect(ruleFalse).toBeNull();
    });
});
