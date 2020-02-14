# JSON File Storage

## Installation
Download this project via Github and add it manually to your project 
or the JSON File Storage npm / yarn package: 

``npm install json-file-storage`` / 
``yarn add json-file-storage``

## Use / API
### A note on ids and merging
You can save, retrieve, or delete all kind of values (they are parsed to json).
All items get an auto-id and will be saved as key-value pairs, e.g. ``{'auto_id': 'your_content'}``.
If you provide an id in an object, e.g. ``storage.put({id: 'own_id', 'content'})``, your id will be used instead of the auto-id.
If you add an item with an id, which is already existing in the store, both items get merged.
You can avoid that behavior by deleting the old item first.

### Put
``
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

const obj_1 = {foo: "bar"};
const obj_2 = 1;

// put an item to the store
const id = storage.put(obj_1); // return a random uuid

// put multiple items to the store (faster than calling put() twice)
const ids = storage.putBulk([obj_1, obj_2]); // returns an array of uuids
``     

### Get (All)
``
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// read an item from the store
const obj = storage.get(id); // returns the stored item

// read multiple items from the store (again, its faster)
const objs = storage.getBulk([id, another_id]); // returns multiple

// read the whole file content
const obj_2 = storage.all(); // returns [{id:'item_1', cool}}]
``

### Delete (Everything)
``
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// delete object from store
storage.remove(ids[0]);

// delete multiple items from a store (you know why...)
const bool = storage.removeBulk([id, another_id]);

// reset storage
const bool = storage.clear();
``


## Donate
If u like it, spend a coffee (or all of your savings): paypal.me/detjen
