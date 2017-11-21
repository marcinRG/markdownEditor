export interface IParserRule {
    allowedChildrenNodes: string[];
    regExpStr: string;
    textNodeChildrenAllowed: boolean;
    matchGroups: number;
    isMultiLine: boolean;
}
