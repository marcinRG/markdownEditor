import {IStringable} from './IStringable';
import {INodeInfo} from './INodeInfo';

export interface INode extends IStringable,INodeInfo {
    addNode(node:IStringable);
    clearNodes();
    addProperty(property:IStringable);
    clearProperties();
}
