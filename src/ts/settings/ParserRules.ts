import {IParserRule} from '../model/interfaces/IParserRule';
import {HTMLTags} from './HTMLTags';
import {IMatchResult} from '../model/interfaces/IMatchResult';

export class ParserRules {
    public static rules: IParserRule[] = [
        {
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
                    }
                }
            }
        },
        {
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
                    }
                }
            }
        },
        {
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
                    }
                }
            }
        },
        {
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
                    }
                }
            }
        },
        {
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
                    }
                }
            }
        },
        {
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
                    }
                }
            }
        },
    ];
}