export class StorageUtils {

    public storageAvailable(type) {
        try {
            const storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return false;
        }
    }

    public clearAll(): void {
        if (this.storageAvailable('localStorage')) {
            localStorage.clear();
        }
    }

    public remove(key: string) {
        if (this.storageAvailable('localStorage')) {
            localStorage.removeItem(key);
        }
    }

    public readValue(key: string): any {
        if (this.storageAvailable('localStorage')) {
            const val = JSON.parse(localStorage.getItem(key));
            if (val) {
                return val;
            }
            return null;
        }
        return null;
    }

    public writeValue(key: string, val: any) {
        if (this.storageAvailable('localStorage')) {
            const value = JSON.stringify(val);
            localStorage.setItem(key, value);
        }
    }
}
