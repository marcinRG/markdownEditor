import {IMatchResult} from '../model/interfaces/IMatchResult';
import {INode} from '../model/interfaces/INode';
import {Tags} from '../settings/Tags';
import {TagNode} from '../model/TagNode';
import {ICreateNode} from '../model/interfaces/ICreateNode';
import {HTMLTags} from '../settings/HTMLTags';
import {Property} from '../model/Property';
import {INodeCreator} from '../model/interfaces/INodeCreator';

export class NodeFactoryCoR implements ICreateNode {

    private nodeCreator: INodeCreator;

    public createNode(matchResults: IMatchResult): INode {
        return null;
    }
}

export class NodeCreator implements INodeCreator {

    constructor(public tag: string, public htmlTag: string, public next: INodeCreator = null) {
    }

    public createNode(matchResult: IMatchResult) {
        if (matchResult && (matchResult.tag === this.tag)) {
            return new TagNode(this.htmlTag);
        } else {
            if (this.next) {
                return this.next.createNode(matchResult);
            }
        }
    }
}

const strongCr = new NodeCreator(Tags.strong, HTMLTags.strong);
const preCr = new NodeCreator(Tags.pre, HTMLTags.pre);
const quoteCr = new NodeCreator(Tags.quote, HTMLTags.quote);
const listCr = new NodeCreator(Tags.list, HTMLTags.ul);
const listElemCr = new NodeCreator(Tags.listElement, HTMLTags.li);
const emCr = new NodeCreator(Tags.em, HTMLTags.em);
const delCr = new NodeCreator(Tags.deleted, HTMLTags.del);
const blockqCr = new NodeCreator(Tags.blockQuote, HTMLTags.blockquote);
const linkCr: INodeCreator = {
    tag: Tags.link,
    htmlTag: HTMLTags.a,
    next: null,
    createNode: (matchResult: IMatchResult) => {
        if (matchResult && (matchResult.tag === this.tag)) {
            const node = new TagNode(linkCr.htmlTag);
            node.addProperty(new Property('href', matchResult.link));
            return node;
        } else {
            if (this.next) {
                return this.next.createNode(matchResult);
            }
        }
    }
};
const underlineCr: INodeCreator = {
    tag: Tags.underline,
    htmlTag: HTMLTags.underline,
    next: null,
    createNode: (matchResult: IMatchResult) => {
        if (matchResult && (matchResult.tag === underlineCr.tag)) {
            const node = new TagNode(underlineCr.htmlTag);
            node.addProperty(new Property('class', 'underline'));
            return node;
        } else {
            if (this.next) {
                return this.next.createNode(matchResult);
            }
        }
    }
};
const headerCr = {
    tag: 'header',
    htmlTag: null,
    next: null,
    createNode: (matchResult: IMatchResult) => {
        if (matchResult && (matchResult.tag === this.tag)) {
            console.log('tag match');
            const txt = 'h' + matchResult.headerSize;
            return new TagNode(txt);
        } else {
            if (this.next) {
                return this.next.createNode(matchResult);
            }
        }
    }
};

headerCr.next = quoteCr;
quoteCr.next = linkCr;
linkCr.next = underlineCr;
underlineCr.next = emCr;
emCr.next = delCr;
delCr.next = strongCr;
strongCr.next = blockqCr;
blockqCr.next = listCr;
listCr.next = listElemCr;
listElemCr.next = preCr;

const func = (val) => {
    return headerCr.createNode(val);
};


// function createF(tag: string, htmlTag: string, next: INodeCreator) {
//     console.log('createF');
//     return function (matchResult: IMatchResult) {
//         console.log('match working');
//         if (matchResult && (matchResult.tag === tag)) {
//             console.log(htmlTag);
//             return new TagNode(htmlTag);
//         } else {
//             if (next) {
//                 return next.createNode(matchResult);
//             }
//         }
//     };
// }


