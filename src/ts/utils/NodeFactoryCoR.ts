import {IMatchResult} from '../model/interfaces/IMatchResult';
import {INode} from '../model/interfaces/INode';
import {Tags} from '../settings/Tags';
import {TagNode} from '../model/TagNode';
import {ICreateNode} from '../model/interfaces/ICreateNode';
import {HTMLTags} from '../settings/HTMLTags';
import {Property} from '../model/Property';
import {INodeCreator} from '../model/interfaces/INodeCreator';

export class NodeFactoryCoR implements ICreateNode {

    private strongCreator: INodeCreator = new NodeCreator(Tags.strong, HTMLTags.strong);
    private preCreator: INodeCreator = new NodeCreator(Tags.pre, HTMLTags.pre);
    private quoteCreator: INodeCreator = new NodeCreator(Tags.quote, HTMLTags.quote);
    private listCreator: INodeCreator = new NodeCreator(Tags.list, HTMLTags.ul);
    private listElemCreator: INodeCreator = new NodeCreator(Tags.listElement, HTMLTags.li);
    private emCreator: INodeCreator = new NodeCreator(Tags.em, HTMLTags.em);
    private delCreator: INodeCreator = new NodeCreator(Tags.deleted, HTMLTags.del);
    private blockqCreator: INodeCreator = new NodeCreator(Tags.blockQuote, HTMLTags.blockquote);
    private linkCreator: INodeCreator = {
        tag: Tags.link,
        htmlTag: HTMLTags.a,
        next: null,
        createNode: (matchResult: IMatchResult) => {
            console.log('inside');
            if (matchResult && (matchResult.tag === this.linkCreator.tag)) {
                const node = new TagNode(this.linkCreator.htmlTag);
                node.addProperty(new Property('href', matchResult.link));
                return node;
            } else {
                if (this.linkCreator.next) {
                    return this.linkCreator.next.createNode(matchResult);
                }
            }
        }
    };
    private underlineCreator: INodeCreator = {
        tag: Tags.underline,
        htmlTag: HTMLTags.underline,
        next: null,
        createNode: (matchResult: IMatchResult) => {
            if (matchResult && (matchResult.tag === this.underlineCreator.tag)) {
                const node = new TagNode(this.underlineCreator.htmlTag);
                node.addProperty(new Property('class', 'underline'));
                return node;
            } else {
                if (this.underlineCreator.next) {
                    return this.underlineCreator.next.createNode(matchResult);
                }
            }
        }
    };
    private headerCreator: INodeCreator = {
        tag: 'header',
        htmlTag: null,
        next: null,
        createNode: (matchResult: IMatchResult) => {
            if (matchResult && (matchResult.tag === this.headerCreator.tag)) {
                const txt = 'h' + matchResult.headerSize;
                return new TagNode(txt);
            } else {
                if (this.headerCreator.next) {
                    return this.headerCreator.next.createNode(matchResult);
                }
            }
        }
    };

    constructor() {
        this.strongCreator.next = this.preCreator;
        this.preCreator.next = this.quoteCreator;
        this.quoteCreator.next = this.listCreator;
        this.listCreator.next = this.listElemCreator;
        this.listElemCreator.next = this.emCreator;
        this.emCreator.next = this.delCreator;
        this.delCreator.next = this.blockqCreator;
        this.blockqCreator.next = this.linkCreator;
        this.linkCreator.next = this.underlineCreator;
        this.underlineCreator.next = this.headerCreator;
    }

    public createNode(matchResults: IMatchResult): INode {
        return this.strongCreator.createNode(matchResults);
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
