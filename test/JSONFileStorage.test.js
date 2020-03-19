const chai = require("chai");
const JSONFileStorage = require("../JSONFileStorage");
const uuid = require("uuid-random");
const fs = require("fs");

const assert = chai.assert;
const file_uri = __dirname + "/test.json";
const storage = new JSONFileStorage(file_uri);
let ids = [];

describe("JSON File Storage", () => {

    it("should write and read two objects (bulk access)", () => {
        // write...
        const obj_1 = {foo: "bar"};
        const obj_2 = {bar: "baz"};
        ids = storage.putBulk([obj_1, obj_2]);
        assert.isString(ids[0]);
        assert.isString(ids[1]);
        // read...
        const read = storage.getBulk([ids[0], ids[1]]);
        assert.deepStrictEqual(obj_1, read[0]);
        assert.deepStrictEqual(obj_2, read[1]);
        assertStoreLength(2);
    });

    it("should write and read two strings (single access)", () => {
        // write...
        const string_1 = "string_1";
        const string_2 = "string_2";
        ids.push(storage.put(string_1));
        ids.push(storage.put(string_2));
        assert.isString(ids[2]);
        assert.isString(ids[3]);
        // read..
        const read_1 = storage.get(ids[2]);
        const read_2 = storage.get(ids[3]);
        assert.equal(string_1, read_1);
        assert.equal(string_2, read_2);
        assertStoreLength(4);
    });

    it("should write and merge two objects with predefined id and read them", () => {
        const id = "__" + uuid() + "__";
        const obj_1 = {id: id, foo: "bar"};
        const obj_2 = {id: id, bar: "baz"};
        const merged_obj = {...obj_1, ...obj_2};
        // should write objects...
        ids.push(storage.put({id: id, foo: "bar"}));
        ids.push(storage.put({id: id, bar: "baz"}));
        // should give only one id to the stored object...
        assert.isString(ids[4]);
        assert.isString(ids[5]);
        assert.equal(id, ids[4]);
        assert.equal(ids[4], ids[5]);
        // should have merged objects...
        const read_1 = storage.get(ids[4]);
        const read_2 = storage.get(ids[5]);
        assert.deepStrictEqual(read_1, read_2);
        assert.deepStrictEqual(read_1, merged_obj);
        assertStoreLength(5);
    });

    it("should get the whole store (all)", () => {
        const stored = JSON.stringify(storage.all());
        for (let i = 0, l = ids.length; i < l; i++) {
            assert.include(stored, ids[i]);
        }
    });

    it("should delete a single object (single access)", () => {
        storage.remove(ids[0]);
        assertStoreLength(4);
    });

    it("should delete a two objects (bulk access)", () => {
        storage.removeBulk([ids[1], ids[2]]);
        assertStoreLength(2);
    });

    it("should not delete something when passing a wrong id", () => {
        storage.remove("wrong_id");
        assertStoreLength(2);
    });

    it("should delete everything = require( the storage and ignore already deleted ids (bulk access)", () => {
        storage.removeBulk(ids);
        assertStoreLength(0);
    });

    it("should empty the storage and delete the file", () => {
        storage.empty();
        let file;
        try {
            file = fs.readFileSync(file_uri);
        } catch (e) {
            assert.exists(e);
        }
        assert.notExists(file);
    });

});

const assertStoreLength = (length) => {
    let file;
    try {
        file = fs.readFileSync(file_uri);
    } catch (e) {
        assert.notExists(e);
    }
    assert.exists(file);
    const file_content = JSON.parse(file);
    assert.isObject(file_content);
    const keys = Object.keys(file_content);
    assert.lengthOf(keys, length);
};
