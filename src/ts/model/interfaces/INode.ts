import {IStringable} from './IStringable';
import {NodeType} from '../enums/NodeType';
import {HTMLTags} from '../enums/HTMLTags';

export interface INode extends IStringable {
    nodeType: NodeType;
    nodeName?: HTMLTags;
}
