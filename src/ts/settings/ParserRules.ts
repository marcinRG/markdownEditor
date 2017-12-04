import {IParserRule} from '../model/interfaces/IParserRule';
import {IMatchResult} from '../model/interfaces/IMatchResult';
import {Tags} from './Tags';

export class ParserRules {
    public static rules: IParserRule[] = [
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
            allowedChildrenNodes: [],
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
}
