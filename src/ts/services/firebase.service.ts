import {AppSettings} from '../settings/AppSettings';
import {database, initializeApp, app} from 'firebase';

class FirebaseService {
    private entriesName: string;
    private entriesRef: database.Reference;
    private fireBaseApp: app.App;
    private db: database.Database;

    constructor(fireBaseSettings: any) {
        this.entriesName = 'entires';
        this.fireBaseApp = initializeApp(fireBaseSettings);
        this.db = this.fireBaseApp.database();
        this.entriesRef = this.db.ref().child(this.entriesName);
    }

    public getEntry(id: string): Promise<any> {
        return this.getElem(id, this.entriesRef);
    }

    public updateEntry(id: string, entry: { text: string }): Promise<any> {
        return this.updateElem(id, entry, this.entriesRef);
    }

    public addEntry(entry: { text: string }): Promise<any> {
        return this.addElem(entry, this.entriesRef);
    }

    public encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    public decodeKey(encodedKey: string): string {
        return decodeURIComponent(encodedKey);
    }

    private getElem(id: string, ref: database.Reference): Promise<any> {
        return new Promise((resolve, reject) => {
            ref.child(id).once('value').then((snapshot) => {
                resolve(snapshot.val());
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private addElem(obj: any, ref: database.Reference): Promise<any> {
        return new Promise((resolve, reject) => {
            const key = ref.push().key;
            ref.child(key).update(obj).then(() => {
                resolve(key);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private updateElem(id: string, obj: any, ref: database.Reference): Promise<any> {
        return ref.child(id).update(obj);
    }
}

export const fireBaseService = new FirebaseService(AppSettings.fireBaseConfig);
