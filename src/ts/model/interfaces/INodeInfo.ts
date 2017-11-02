import {NodeType} from '../enums/NodeType';
import {HTMLTags} from '../enums/HTMLTags';

export class INodeInfo {
    nodeType: NodeType;
    nodeName?: HTMLTags;
}