import * as Promise from 'bluebird';
export interface IStorage {

    save(value: any): Promise<any>;

    read(): Promise<any>;
}
