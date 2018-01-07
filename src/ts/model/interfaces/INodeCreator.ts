import {IMatchResult} from './IMatchResult';
import {INode} from './INode';

export interface INodeCreator {
    tag: string;
    htmlTag: string;
    next: INodeCreator;
    createNode: (results: IMatchResult) => INode;
}
