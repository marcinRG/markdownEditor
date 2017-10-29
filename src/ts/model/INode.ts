import {IStringable} from './IStringable';
import {NodeType} from './NodeType';
import {HTMLTags} from './HTMLTags';

export interface INode extends IStringable {
    nodeType: NodeType;
    nodeName?: HTMLTags;
}
