const JSONFileManager = require("./JSONFileManager");
const uuid = require("uuid-random");
const fs = require("fs");

/**
 * A simple, synchronous file storage
 */
class JSONFileStorage {

    /**
     * Creates a new instance, storage is persisted at the given file path
     * @param path {string}, e.g. 'C:/users/foo/bar/baz.json', './baz.json', ...
     */
    constructor(path) {
        this.path = path;
        this.store = {};
    }

    /**
     * stores an item and returns it's id
     * @param item {*}
     * @return id {string}
     */
    put(item) {
        requestStore(this);
        const id = putToStore(item, this);
        persistStore(this);
        freeStore(this);
        return id;
    };

    /**
     * stores multiple items and returns their ids, use for performance
     * @param array_of_items {[*]}
     * @return ids {array}
     */
    putBulk(array_of_items) {
        requestStore(this);
        const ids = [];
        for (let i = 0, l = array_of_items.length; i < l; i++) {
            let id = putToStore(array_of_items[i], this);
            ids.push(id);
        }
        persistStore(this);
        freeStore(this);
        return ids;
    };

    /**
     * retrieves a stored item with the given id
     * @param id {string}
     * @returns {*, null}
     */
    get(id) {
        requestStore(this);
        const item = this.store[id];
        freeStore(this);
        if (item === undefined) return null;
        return item;
    };

    /**
     * retrieves multiple stored items with the given ids
     * @param array_of_ids {[string]}
     * @returns {[]}
     */
    getBulk(array_of_ids) {
        requestStore(this);
        const items = [];
        for (let i = 0, l = array_of_ids.length; i < l; i++) {
            items.push(this.store[array_of_ids[i]]);
        }
        freeStore(this);
        return items;
    };

    /**
     * removes a stored item with the given id
     * @param id {string}
     * @return {boolean} if removal was successful
     */
    remove(id) {
        requestStore(this);
        if (this.store[id] === undefined) {
            freeStore(this);
            return false;
        }
        delete this.store[id];
        persistStore(this);
        freeStore(this);
        return true;
    };

    /**
     * removes multiple stored items with the given ids, use for performance
     * @param array_of_ids {[string]}
     * @return {[string]} all removed item's ids
     */
    removeBulk(array_of_ids) {
        let result = [];
        requestStore(this);
        for (let i = 0, l = array_of_ids.length; i < l; i++) {
            if (this.store[array_of_ids[i]] !== undefined) {
                result.push(array_of_ids[i]);
                delete this.store[array_of_ids[i]];
            }
        }
        persistStore(this);
        freeStore(this);
        return result;
    };

    /**
     * empties the storage, removes the file
     */
    empty() {
        freeStore(this);
        fs.unlinkSync(this.path);
    };

    /**
     * returns all store items in an array
     * @return {object}
     */
    all() {
        requestStore(this);
        const items = JSON.parse(JSON.stringify(this.store));
        freeStore(this);
        return items;
    }

}

const putToStore = (item, instance) => {
    let id;
    if (item.id !== undefined) {
        id = item.id;
    } else {
        id = uuid();
        if (typeof item === "object") item.id = id;
    }
    if (typeof item === "object" && instance.store[id] !== undefined) {
        // merge objects with given id
        instance.store[id] = {...instance.store[id], ...item};
    } else {
        // create / replace in all other cases
        instance.store[id] = item;
    }
    return id;
};

const requestStore = (instance) => {
    instance.store = JSONFileManager.load(instance.path);
    if (typeof instance.store !== 'object' || instance.store === null) instance.store = {}; // init
};

const freeStore = (instance) => {
    instance.store = null;
};

const persistStore = (instance) => {
    JSONFileManager.save(instance.path, instance.store);
};


module.exports = JSONFileStorage;
