import {IParserRule} from '../model/interfaces/IParserRule';
import {HTMLTags} from './HTMLTags';
import {IMatchResult} from '../model/interfaces/IMatchResult';
import {Tags} from './Tags';

export class ParserRules {
    public static rules: IParserRule[] = [
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
}
