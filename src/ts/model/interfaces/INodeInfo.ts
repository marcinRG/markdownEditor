import {NodeType} from '../enums/NodeType';
import {HTMLTags} from '../enums/HTMLTags';

export interface INodeInfo {
    nodeType: NodeType;
    nodeName?: HTMLTags;
}
