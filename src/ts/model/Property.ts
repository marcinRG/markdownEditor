import {IStringable} from './interfaces/IStringable';

export class Property implements IStringable {
    constructor(private name: string, private value: string) {
    }

    public toString() {
        return ` ${this.name}="${this.value}"`;
    }
}
