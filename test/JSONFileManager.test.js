const chai = require("chai");
const JSONFileManager = require("../JSONFileManager");

const assert = chai.assert;
const file_path = __dirname + "/JSONFileManager__TEST.json";


describe("JSON File Manager", () => {

    it("should return null if file is not existing", () => {
        assert.isNull(JSONFileManager.load(file_path + "wrong_path"));
    });

    it("should write and read a number", () => {
        assertReadWrite(0);
    });

    it("should write and read a string", () => {
        const content = assertReadWrite("test");
    });

    it("should write and read an object", () => {
        assertReadWrite({foo: "bar"});
    });

    it("should write and read an array", () => {
        assertReadWrite([0, 2, 1, {}, "a"]);
    });

    it("should write and read null", () => {
        assertReadWrite(null);
    });

    it("should write undefined and return as null (json)", () => {
        assert.isTrue(JSONFileManager.save(file_path, undefined));
        assert.isNull(JSONFileManager.load(file_path));
    });

    it("should return false if trying to save the file at directory path", () => {
        assert.isFalse(JSONFileManager.save(__dirname, ""));
    });

    it("should delete a file at right path and return false if path is not right", () => {
        // false path
        assert.isFalse(JSONFileManager.delete(file_path + "wrong_path"));
        // true path
        assert.isTrue(JSONFileManager.delete(file_path));
    });

});

const assertReadWrite = (input) => {
    assert.isTrue(JSONFileManager.save(file_path, input));
    const read = JSONFileManager.load(file_path);
    assert.deepStrictEqual(read, input);
    return read;
};
