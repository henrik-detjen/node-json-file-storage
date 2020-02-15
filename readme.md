# JSON File Storage

## Installation
Download this project via Github and add it manually to your project 
or install the JSON File Storage npm / yarn package: 

``npm install json-file-storage`` / 
``yarn add json-file-storage``

## How to use / API
### Put
```javascript
// create store...
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// content to save...
const obj_1 = 'some_content';
const obj_2 = {bar: 'baz'};

// save to file 
const id = storage.put(obj_1); // returns a random uuid 'id_1'

// save multiple items into the store (faster than calling put() twice)
const ids = storage.putBulk([obj_1, obj_2]); // returns an array of uuids: ['id_1', 'id_2']
```     
#### A note on the use of ids
You can use the storage in db manner (auto-id) ``const id = storage.put('your_content');`` or key-value manner by wrapping your content in an object and providing your own keys in an id field ``storage.put({id:'your_key', 'your_content'})``.

If you put an object with an id existing in the store, the existing and the new object will be merged, strings etc. will be replaced.
An example: the new object ``{'id': {'foo': 1, 'bar': 2}}`` and the existing ``{'id': {'foo': 2, 'baz': 4}}`` will result in ``{'id': {'foo': 1, 'bar': 2, 'baz': 4}}``.


### Get (everything)
```javascript
// create store...
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);  

// retrieve an item from the store
const obj = storage.get('id_1'); // returns the item or null

// retrieve multiple items from the store (again, its faster)
const objs = storage.getBulk(['id_1', 'id_2']); // returns an array of items found: ['some_content', {bar: 'baz'}]

// read the whole store
const everything = storage.all(); // returns a copy of the store: [{'id_1': 'some_content', 'id_2': {bar: 'baz'}}]
```
### Delete (everything)
```javascript
// create store...
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// delete from store
const bool = storage.remove('id_1'); // returns if successfull
// or simply...
storage.remove('id_1');

// delete multiple items the store (you know why...)
storage.removeBulk(['id_1', 'id_2']);

// clear the whole store
storage.clear();
```



## Donate
If you like the project and it saved you a while of coding, spend me a coffee (or all of your savings) to keep me motivated: [paypal.me](https://paypal.me/detjen)
