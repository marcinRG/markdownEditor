import {IMatchResult} from './interfaces/IMatchResult';
import {INode} from './interfaces/INode';
import {TagNode} from './TagNode';
import {Tags} from '../settings/Tags';
import {HTMLTags} from '../settings/HTMLTags';
import {Property} from './Property';

export class NodeFactory {
    public static createNode(matchResults: IMatchResult): INode {
        return createHeader(matchResults);
    }
}

const createHeader = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.header)) {
        const txt = 'h' + matchResult.headerSize;
        return new TagNode(txt);
    }
    return createStrong(matchResult);
};

const createStrong = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.strong)) {
        return new TagNode(HTMLTags.strong);
    }
    return createUnderline(matchResult);
};

const createUnderline = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.underline)) {
        const node = new TagNode(HTMLTags.underline);
        node.addProperty(new Property('class', 'underline'));
        return node;
    }
    return createDeleted(matchResult);
};

const createDeleted = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.deleted)) {
        return new TagNode(HTMLTags.del);
    }
    return createLink(matchResult);
};

const createLink = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.link)) {
        const node = new TagNode(HTMLTags.a);
        node.addProperty(new Property('href', matchResult.link));
        return node;
    }
    return createList(matchResult);
};

const createList = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.list)) {
        return new TagNode(HTMLTags.ul);
    }
    return createListElement(matchResult);
};

const createListElement = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.listElement)) {
        return new TagNode(HTMLTags.li);
    }
    return null;
};