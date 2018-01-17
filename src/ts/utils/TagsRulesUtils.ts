import {IParserRule} from '../model/interfaces/IParserRule';
import {ITag} from '../model/interfaces/ITag';

export function findInArray(value: string, propertyName: string, array: any[]): number {
    return array.findIndex((elem: any) => {
        if (elem.hasOwnProperty(propertyName)) {
            return elem[propertyName] === value;
        }
    });
}

export function findParserRuleWithHTMLTag(htmlTag: string, tags: ITag[], rules: IParserRule[]): IParserRule {
    const tagIndex = findInArray(htmlTag, 'htmlTag', tags);
    if (tagIndex >= 0) {
        const tag = tags[tagIndex].tag;
        return findParserRuleWithTag(tag, rules);
    }
    return null;
}

export function findParserRuleWithTag(tag: string, rules: IParserRule[]) {
    const ruleIndex = findInArray(tag, 'name', rules);
    return (ruleIndex >= 0) ? rules[ruleIndex] : null;
}

export function getAllAllowedChildrenRegexStr(tag: string, rules: IParserRule[]): string {
    let tab = [];
    const rule = findParserRuleWithTag(tag, rules);
    if (rule) {
        tab = rule.allowedChildrenNodes.map((allowedChild) => {
            return findRegexStrWithTag(allowedChild, rules);
        }).filter((value) => value);
    }
    if (tab.length === 0) {
        tab.push('($)');
    }
    return tab.join('|');
}

export function findRegexStrWithTag(tag: string, rules: IParserRule[]): string {
    const rule = findParserRuleWithTag(tag, rules);
    return rule ? rule.regExpStr : null;
}
