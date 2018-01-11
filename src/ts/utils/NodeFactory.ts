import {IMatchResult} from '../model/interfaces/IMatchResult';
import {INode} from '../model/interfaces/INode';
import {TagNode} from '../model/TagNode';
import {Tags} from '../settings/Tags';
import {HTMLTags} from '../settings/HTMLTags';
import {Property} from '../model/Property';
import {ICreateNode} from '../model/interfaces/ICreateNode';

export class NodeFactory implements ICreateNode {
    public createNode(matchResults: IMatchResult): INode {
        if (matchResults) {
            const newTag = createTagNode(matchResults);
            if (matchResults.tag === Tags.link) {
                newTag.addProperty(new Property('href', matchResults.link));
            }
            if (matchResults.tag === Tags.underline) {
                newTag.addProperty(new Property('class', 'underline'));
            }
            return newTag;
        }
    }
}

const createTagNode = (matchResults: IMatchResult): INode => {
    switch (matchResults.tag) {
        case Tags.header: {
            return new TagNode('h' + matchResults.headerSize);
        }
        case Tags.link: {
            return new TagNode(HTMLTags.a);
        }
        case Tags.underline: {
            return new TagNode(HTMLTags.underline);
        }
        case Tags.strong: {
            return new TagNode(HTMLTags.strong);
        }
        case Tags.underline: {
            return new TagNode(HTMLTags.underline);
        }
        case Tags.deleted: {
            return new TagNode(HTMLTags.del);
        }
        case Tags.link: {
            return new TagNode(HTMLTags.a);
        }
        case Tags.list: {
            return new TagNode(HTMLTags.ul);
        }
        case Tags.listElement: {
            return new TagNode(HTMLTags.li);
        }
        case Tags.em: {
            return new TagNode(HTMLTags.em);
        }
        case Tags.blockQuote: {
            return new TagNode(HTMLTags.blockquote);
        }
        case Tags.quote: {
            return new TagNode(HTMLTags.quote);
        }
        case Tags.pre: {
            return new TagNode(HTMLTags.pre);
        }
        default: {
            return null;
        }
    }
};
