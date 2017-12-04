import {IMatchResult} from './IMatchResult';
import {INode} from './INode';

export interface ICreateNode {
    createNode(matchResults: IMatchResult): INode;
}