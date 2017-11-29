import {INode} from '../model/interfaces/INode';
import {IParserRule} from '../model/interfaces/IParserRule';
import {TagNode} from '../model/TagNode';
import {HTMLTags} from '../settings/HTMLTags';
import {TextNode} from '../model/TextNode';
import {IMatchResult} from '../model/interfaces/IMatchResult';
import {NodeFactory} from '../model/NodeFactory';
import {ITag} from '../model/interfaces/ITag';

export class Parser {

    private rules: IParserRule[];
    private tags: ITag[];

    constructor(rules: IParserRule[], tags: ITag[]) {
        this.rules = rules;
        this.tags = tags;
    }

    public parse(text: string): INode {
        const all: INode = new TagNode(HTMLTags.div);
        parseText(text, all, this.rules, this.tags);
        return all;
    }

    public getTags(): ITag[] {
        return this.tags;
    }

    public getRules(): IParserRule[] {
        return this.rules;
    }

    public getAllowedChildrenRegexStr(tag: string): string {
        return getChildrenRegexStr(tag, 'name', this.rules);
    }

    public getParserRuleByTag(tag: string): IParserRule {
        const pos = findInArray(tag, 'name', this.rules);
        if (pos >= 0) {
            return this.rules[pos];
        }
        return null;
    }

    public getParserRuleByHTMLTag(htmlTag: string): IParserRule {
        const pos = findInArrays(htmlTag, 'htmlTag', 'tag', this.tags, 'name', this.rules);
        if (pos >= 0) {
            return this.rules[pos];
        }
        return null;
    }
}

const getRegexStr = (tag: string, rules: IParserRule[]): string => {
    const pos = findInArray(tag, 'name', rules);
    if (pos >= 0) {
        const rule = rules[pos];
        return rule.regExpStr;
    }
    return null;
};

const getMatchGroups = (tag: string, rules: IParserRule[]): number => {
    const pos = findInArray(tag, 'name', rules);
    if (pos >= 0) {
        return rules[pos].matchGroups;
    }
    return -1;
};

const parseText = (text: string, parentNode: INode, rules: IParserRule[], tags: ITag[]) => {
    if (text && text.length) {
        const tag = rules[findInArrays(parentNode.getNodeName(), 'htmlTag', 'tag', tags, 'name', rules)].name;
        if (tag) {
            const regExp = new RegExp(getChildrenRegexStr(tag, 'name', rules), 'i');
            text = findAndAddTextNode(text, regExp, parentNode);
            text = findAndAddTagNode(text, regExp, tag, parentNode, rules, tags);
        }
        parseText(text, parentNode, rules, tags);
    }
};

const findInArray = (value: string, propertyName: string, array: any[]): number => {
    let i = -1;
    if (array && array.length) {
        const val = array[0];
        if (val.hasOwnProperty(propertyName)) {
            for (i = 0; i < array.length; i++) {
                if (array[i][propertyName] === value) {
                    return i;
                }
            }
            i = -1;
        }
    }
    return i;
};

const findInArrays = (val1: string, property11: string, property12: string, array1: any[], property2: string, array2: any[]) => {
    const pos1 = findInArray(val1, property11, array1);
    const pos2 = findInArray(array1[pos1][property12], property2, array2);
    if (pos2 >= 0) {
        return pos2;
    }
    return -1;
};

const getChildrenRegexStr = (tagName: string, propertyName: string, array: IParserRule[]): string => {
    const tab = [];
    const pos = findInArray(tagName, propertyName, array);
    if (pos >= 0) {
        const childrenRules = array[pos].allowedChildrenNodes;
        if (childrenRules) {
            for (const elem of childrenRules) {
                tab.push(getRegexStr(elem, array));
            }
        }
    }
    if (tab.length === 0) {
        tab.push('($)');
    }
    return tab.join('|');
};

const getText = (text: string, regExp: RegExp): string => {
    const results = text.search(regExp);
    if (results > 0) {
        return text.substring(0, results);
    }
    if (results < 0) {
        return text;
    }
    return null;
};

const findAndAddTextNode = (text: string, regexp: RegExp, parentNode: INode): string => {
    const txtNew = getText(text, regexp);
    if (txtNew) {
        const len = (txtNew && txtNew.length) ? txtNew.length : text.length;
        parentNode.addNode(new TextNode(txtNew));
        text = text.substring(len, text.length);
    }
    return text;
};

const findAndAddTagNode = (text: string, regexp: RegExp, tagName: string, parentNode: INode, rules: IParserRule[], tags: ITag[]): string => {
    const results = text.match(regexp);
    if (results) {
        const pos = findFirstInMatchResult(results);
        const rule = findChildTagRule(pos, tagName, rules);
        if (rule) {
            const matchResult: IMatchResult = rule.values(results, pos);
            if (matchResult) {
                const newNode = NodeFactory.createNode(matchResult);
                if (newNode) {
                    parentNode.addNode(newNode);
                    parseText(matchResult.innerText, newNode, rules, tags);
                    const len = matchResult.matchedText.length;
                    text = text.substring(len, text.length);
                }
            }
        }
    }
    return text;
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

const findChildTagRule = (index: number, tag: string, rules: IParserRule[]): IParserRule => {
    const pos = findInArray(tag, 'name', rules);
    if (pos >= 0) {
        let diff = index - 1;
        const childrenNodes = rules[pos].allowedChildrenNodes;
        if (childrenNodes && childrenNodes.length) {
            for (const val of childrenNodes) {
                if (diff === 0) {
                    return rules[findInArray(val, 'name', rules)];
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
