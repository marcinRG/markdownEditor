import {IStringable} from './interfaces/IStringable';

export class Collection<T extends IStringable> {
    private array: T[] = [];

    public add(T) {
        this.array.push(T);
    }

    public clear() {
        this.array = [];
    }

    public toString(): string {
        let str: string = '';
        for (const elem of this.array) {
            str += elem.toString();
        }
        return str;
    }
}
