import {INode} from '../model/interfaces/INode';
import {IParserRule} from '../model/interfaces/IParserRule';
import {TagNode} from '../model/TagNode';
import {HTMLTags} from '../settings/HTMLTags';
import {TextNode} from '../model/TextNode';
import {IMatchResult} from '../model/interfaces/IMatchResult';
import {ITag} from '../model/interfaces/ITag';
import {ICreateNode} from '../model/interfaces/ICreateNode';
import {
    findParserRuleWithHTMLTag, findParserRuleWithTag,
    getAllAllowedChildrenRegexStr
} from './TagsRulesUtils';
import {getMatchResults} from './MatchResultsUtils';

export class Parser {

    private rules: IParserRule[];
    private tags: ITag[];
    private tagsFactory: ICreateNode;

    constructor(rules: IParserRule[], tags: ITag[], tagsFactory: ICreateNode) {
        this.rules = rules;
        this.tags = tags;
        this.tagsFactory = tagsFactory;
    }

    public parse(text: string): INode {
        const all: INode = new TagNode(HTMLTags.div);
        parseText(text, all, this.rules, this.tags, this.tagsFactory);
        return all;
    }

    public getTags(): ITag[] {
        return this.tags;
    }

    public getRules(): IParserRule[] {
        return this.rules;
    }

    public getAllowedChildrenRegexStr(tag: string): string {
        return getAllAllowedChildrenRegexStr(tag, this.rules);
    }

    public getParserRuleByTag(tag: string): IParserRule {
        return findParserRuleWithTag(tag, this.rules);
    }

    public getParserRuleByHTMLTag(htmlTag: string): IParserRule {
        return findParserRuleWithHTMLTag(htmlTag, this.tags, this.rules);
    }
}

function parseText(text: string, parentNode: INode, rules: IParserRule[], tags: ITag[], tagsFactory: ICreateNode) {
    if (text && text.length) {
        const rule = findParserRuleWithHTMLTag(parentNode.getNodeName(), tags, rules);
        if (rule) {
            const regExp = new RegExp(getAllAllowedChildrenRegexStr(rule.name, rules), 'i');
            text = findAndAddTextNode(text, regExp, parentNode);
            text = findAndAddTagNode(text, regExp, rule.name, parentNode, rules, tags, tagsFactory);
        } else {
            text = createTextNode(text, text, parentNode);
        }
        parseText(text, parentNode, rules, tags, tagsFactory);
    }
}

function getText(text: string, regExp: RegExp): string {
    const results = text.search(regExp);
    if (results > 0) {
        return text.substring(0, results);
    }
    if (results < 0) {
        return text;
    }
}

function findAndAddTextNode(text: string, regexp: RegExp, parentNode: INode): string {
    const txtNew = getText(text, regexp);
    return createTextNode(text, txtNew, parentNode);
}

function findAndAddTagNode(text: string, regexp: RegExp, tagName: string, parentNode: INode,
                           rules: IParserRule[], tags: ITag[], tagsFactory: ICreateNode): string {
    const results = text.match(regexp);
    if (results) {
        const matchResult: IMatchResult = getMatchResults(results, tagName, rules);
        if (matchResult) {
            const newNode = createNode(matchResult, tagsFactory);
            if (newNode) {
                parentNode.addNode(newNode);
                parseText(matchResult.innerText, newNode, rules, tags, tagsFactory);
                const len = matchResult.matchedText.length;
                text = text.substring(len, text.length);
            } else {
                text = createTextNode(text, matchResult.matchedText, parentNode);
            }
        } else {
            text = createTextNode(text, results[0], parentNode);
        }
    }
    return text;
}

function createTextNode(text: string, textToAdd: string, parentNode: INode): string {
    if (textToAdd) {
        const len = (textToAdd && textToAdd.length) ? textToAdd.length : text.length;
        parentNode.addNode(new TextNode(textToAdd));
        text = text.substring(len, text.length);
    }
    return text;
}

function createNode(matchResult: IMatchResult, tagsFactory: ICreateNode): INode {
    if (matchResult) {
        return tagsFactory.createNode(matchResult);
    }
}
