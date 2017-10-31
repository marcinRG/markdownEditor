import { INode } from '../model/interfaces/INode';

const expr1 = /(#{1,6}\s(.*)\n)|(\*\s(.*)\n)|(\*\*(.*)\*\*)|(__(.*)__)|(--(.*)--)/i;

export class Parser {
    public static parseText(text: string): INode {
        return null;
    }
}
