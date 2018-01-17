import {StorageUtils} from '../../src/ts/utils/StorageUtils';

describe('Storage tests', () => {

    const key1 = 'key1';
    const key2 = 'key2';
    const storage: StorageUtils = new StorageUtils();

    beforeEach(() => {
        if (storage.storageAvailable('localStorage')) {
            storage.clearAll();
        }
    });

    it('should work as expected', () => {
        expect(storage).toBeDefined();
        expect(storage.storageAvailable('localStorage')).toBeTruthy();
        const val = 'something';
        storage.writeValue(key1, val);
        const val2 = storage.readValue(key1);
        expect(val).toBe(val2);
        const val3 = storage.readValue(key2);
        expect(val3).toBeNull();
    });

    it('should work as expected', () => {

        const val = 'something';
        storage.writeValue(key1, val);
        const val2 = storage.readValue(key1);
        expect(val).toBe(val2);
        storage.remove(key1);
        const val3 = storage.readValue(key1);
        expect(val3).toBeNull();
    });
});
