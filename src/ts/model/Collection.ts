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
        return this.array.map((val) => val.toString()).join('');
    }
}
