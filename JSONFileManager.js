const fs = require("fs");

class JSONFileManager {

    /**
     * saves a javascript object to a json file at the specified path
     * @param path {string}
     * @param object {*}
     * @return {boolean}
     */
    static save(path, object) {
        const json = JSON.stringify(object);
        try {
            fs.writeFileSync(path, json);
            return true;
        } catch (err) {
            //console.error(err.message);
            return false;
        }
    }

    /**
     * loads a javascript object out of a json file from the given path or return null if file not existing
     * @param path {string}
     * @returns {*|null}
     */
    static load(path) {
        try {
            const file = fs.readFileSync(path, 'utf8');
            return JSON.parse(file);
        } catch (err) {
            //console.error(err.message);
            return null;
        }
    }

    /**
     * deletes a file at the given path
     * @param path {string}
     * @returns {boolean} if successful
     */
    static delete(path) {
        try {
            fs.unlinkSync(path);
            return true;
        } catch (err) {
            //console.error(err.message);
            return false;
        }
    }

}

module.exports = JSONFileManager;
