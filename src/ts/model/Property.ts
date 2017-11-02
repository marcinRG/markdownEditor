import {IStringable} from './interfaces/IStringable';

export class Property implements IStringable {
    name: string;
    value: string;

    public toString() {
        return ` ${this.name}="${this.value}"`;
    }

}
