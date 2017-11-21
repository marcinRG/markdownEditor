import {NodeType} from '../enums/NodeType';

export interface INodeInfo {
    nodeType: NodeType;
    getNodeName():string;
}
