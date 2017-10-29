'use strict';

export class StorageUtils {
    public static storageAvailable(type) {
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

    public static readValue(key): any {
        if (this.storageAvailable('localStorage')) {
            const val = JSON.parse(localStorage.getItem(key));
            if (val) {
                return val;
            }
            return {};
        }
        return {};
    }

    public static writeValue(key, val) {
        if (this.storageAvailable('localStorage')) {
            const value = JSON.stringify(val);
            localStorage.setItem(key, value);
        }
    }
}
