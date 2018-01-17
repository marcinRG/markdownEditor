import {findInArray, findRegexStrWithTag} from './TagsRulesUtils';
import {IParserRule} from '../model/interfaces/IParserRule';
import {IMatchResult} from '../model/interfaces/IMatchResult';

export function getMatchResults(results: RegExpMatchArray, tagName: string, rules: IParserRule[]) {
    if (results) {
        const pos = findFirstInMatchResult(results);
        const rule = findChildTagRule(pos, tagName, rules);
        if (rule) {
            const matchResult: IMatchResult = rule.values(results, pos);
            if (matchResult) {
                return matchResult;
            }
        }
        return null;
    }
}

function findFirstInMatchResult(tab: string[]) {
    if ((tab) && (tab.length > 1)) {
        for (let i = 1; i < tab.length; i++) {
            if (tab[i]) {
                return i;
            }
        }
    }
    return -1;
}

function getExistingChildrenNodes(position: number, rules: IParserRule[]) {
    if (position <= rules.length) {
        const tab = [];
        const childrenRules = rules[position].allowedChildrenNodes;
        for (const elem of childrenRules) {
            const regexStr = findRegexStrWithTag(elem, rules);
            if (regexStr) {
                tab.push(elem);
            }
        }
        return tab;
    }
}

function findChildTagRule(index: number, tag: string, rules: IParserRule[]): IParserRule {
    const pos = findInArray(tag, 'name', rules);
    if (pos >= 0 && index >= 0) {
        let diff = index - 1;
        const childrenNodes = getExistingChildrenNodes(pos, rules);
        if (childrenNodes && childrenNodes.length > 0) {
            for (const val of childrenNodes) {
                if (diff === 0) {
                    return rules[findInArray(val, 'name', rules)];
                }
                if (diff > 0) {
                    diff = diff - getMatchGroups(val, rules);
                }
            }
        }
    }
    return null;
}

function getMatchGroups(tag: string, rules: IParserRule[]): number {
    const pos = findInArray(tag, 'name', rules);
    if (pos >= 0) {
        return rules[pos].matchGroups;
    }
}
