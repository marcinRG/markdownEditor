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

//public static header: string = 'header';
const createHeader = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.header)) {
        const txt = 'h' + matchResult.headerSize;
        return new TagNode(txt);
    }
    return createStrong(matchResult);
};

//public static strong: string = 'strong';
const createStrong = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.strong)) {
        return new TagNode(HTMLTags.strong);
    }
    return createUnderline(matchResult);
};

//public static underline: string = 'underline';
const createUnderline = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.underline)) {
        const node = new TagNode(HTMLTags.underline);
        node.addProperty(new Property('class', 'underline'));
        return node;
    }
    return createDeleted(matchResult);
};
//public static deleted: string = 'deleted';
const createDeleted = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.deleted)) {
        return new TagNode(HTMLTags.del);
    }
    return createLink(matchResult);
};
//public static link: string = 'link';
const createLink = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.link)) {
        const node = new TagNode(HTMLTags.a);
        node.addProperty(new Property('href', matchResult.link));
        return node;
    }
    return createList(matchResult);
};
//public static list: string = 'list';
const createList = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.list)) {
        return new TagNode(HTMLTags.ul);
    }
    return createListElement(matchResult);
};
//public static listElement: string = 'listElement';
const createListElement = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.listElement)) {
        return new TagNode(HTMLTags.li);
    }
    return createEmphasis(matchResult);
};

//public static em: string = 'emphasis';
const createEmphasis = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.em)) {
        return new TagNode(HTMLTags.em);
    }
    return createBlockQuote(matchResult);
};
//public static blockQuote: string = 'blockQuote';
const createBlockQuote = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.blockQuote)) {
        return new TagNode(HTMLTags.blockquote);
    }
    return createQuote(matchResult);
};
//public static quote: string = 'quote';
const createQuote = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.quote)) {
        return new TagNode(HTMLTags.quote);
    }
    return createPre(matchResult);
};
//public static pre: string = 'pre';
const createPre = (matchResult: IMatchResult): INode => {
    if (matchResult && (matchResult.tag === Tags.pre)) {
        return new TagNode(HTMLTags.pre);
    }
    return null;
};