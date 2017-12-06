import * as Promise from 'bluebird';
import {StorageUtils} from '../utils/StorageUtils';
import {AppSettings} from '../settings/AppSettings';
import {IStorage} from '../model/interfaces/IStorage';

class StorageService {

    private storage = new StorageUtils();
    private appKey = AppSettings.appKey;
    private templateText = AppSettings.templateText;

    public save(value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.storage.writeValue(this.appKey, value);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }

    public read(): Promise<string> {
        return new Promise((resolve, reject) => {
            const val = this.storage.readValue(this.appKey);
            if (val) {
                resolve(val);
            } else {
                reject(this.templateText);
            }
        });
    }
}

export const storageService: IStorage = new StorageService();
