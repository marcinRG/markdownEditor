import {INode} from '../model/interfaces/INode';
import {IParserRule} from '../model/interfaces/IParserRule';

export class Parser {

    private rules: IParserRule[];

    constructor(rules: IParserRule[]) {
        this.rules = rules;
    }

    public parse(text: string): INode {
        return null;
    }

    public getRules(): IParserRule[] {
        return this.rules;
    }

    public getAllowedChildrenRegexStr(tag: string): string {
        const tab = [];
        const pos = findTag(tag, this.rules);
        if (pos) {
            const childrenRules = this.rules[pos].allowedChildrenNodes;
            if (childrenRules) {
                for (const elem of childrenRules) {
                    tab.push(getRegexStr(elem, this.rules));
                }
            }
        }
        return tab.join('|');
    }

    public getParserRule(tag: string): IParserRule {
        const pos = findTag(tag, this.rules);
        if (pos) {
            return this.rules[pos];
        }
        return null;
    }
}

const findTag = (tag: string, rules: IParserRule[]): number => {
    let i;
    if (rules && rules.length) {
        for (i = 0; i < rules.length; i++) {
            if (rules[i].name === tag) {
                return i;
            }
        }
    }
    return -1;
};

const getRegexStr = (tag: string, rules: IParserRule[]): string => {
    const pos = findTag(tag, rules);
    if (pos) {
        const rule = rules[pos];
        return rule.regExpStr;
    }
    return null;
};

const findFirstInMatchResult = (tab: string[]) => {
    if ((tab) && (tab.length > 1)) {
        for (let i = 1; i < tab.length; i++) {
            if (tab[i]) {
                return i;
            }
        }
    }
    return -1;
};

const getMatchGroups = (tag: string, rules: IParserRule[]): number => {
    const pos = findTag(tag, rules);
    if (pos) {
        return rules[pos].matchGroups;
    }
    return -1;
};

const findAllowedChildTag = (index: number, tag: string, rules: IParserRule[]): string => {
    const pos = findTag(tag, rules);
    if (pos) {
        let diff = index - 1;
        const childrenNodes = rules[pos].allowedChildrenNodes;
        if (childrenNodes && childrenNodes.length) {
            for (const val of childrenNodes) {
                if (diff === 0) {
                    return val;
                }
                if (diff > 0) {
                    diff = diff - getMatchGroups(val, rules);
                }
                if (diff < 0) {
                    return null;
                }
            }
        }
        return null;
    }
    return null;
};

// export class ParserRules {
//
//     public static findTag(text: string, parentNode: string): string {
//         const reqExp = new RegExp(ParserRules.getAllAllowedTagsRuleStr(parentNode), 'i');
//         if (text.search(reqExp) === 0) {
//             const resultArray = text.match(reqExp);
//             if (resultArray) {
//                 return findAllowedChildTag(findFirstInMatchResult(resultArray), parentNode);
//             }
//             return null;
//         }
//         return null;
//     }
//
// }
