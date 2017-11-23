import {IMatchResult} from './IMatchResult';

export interface IParserRule {
    name: string;
    allowedChildrenNodes: string[];
    regExpStr: string;
    tagName: string;
    textNodeChildrenAllowed?: boolean;
    matchGroups: number;
    isMultiLine?: boolean;
    values(matchResult: RegExpMatchArray, index: number): IMatchResult;
}
