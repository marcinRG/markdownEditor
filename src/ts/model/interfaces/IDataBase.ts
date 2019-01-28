export interface IDataBase {
    getEntry(id: string): Promise<any>;

    updateEntry(id: string, entry: { text: string }): Promise<any>;

    addEntry(entry: { text: string }): Promise<any>;

    encodeKey(key: string): string;

    decodeKey(encodedKey: string): string;
}
