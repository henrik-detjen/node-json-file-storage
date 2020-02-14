# JSON File Storage

## Installation
Download this project via Github and add it manually to your project 
or install the JSON File Storage npm / yarn package: 

``npm install json-file-storage`` / 
``yarn add json-file-storage``

## Use / API
### Put
```javascript
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

const obj_1 = {foo: "bar"};
const obj_2 = {bar: "baz"};

// save to file 
const id = storage.putBulk([obj_1, obj_2]); // return a random uuid

// save multiple items into the store (faster than calling put() twice)
const ids = storage.putBulk([obj_1, obj_2]); // returns an array of uuids
```     
### Get
```javascript
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// read from file
const obj_1 = storage.get(id);

// read multiple items from a file (again, its faster)
const obj_2 = storage.getBulk([id, another_id]);
```
### Delete
```javascript
const file_uri = __dirname + "/your-storage-name.json";
const storage = new JSONFileStorage(file_uri);

// read from file
const obj_1 = storage.get(id);

// read multiple items from a file (again, its faster)
const obj_2 = storage.getBulk([id, another_id]);
```



## Donate
If u like it, spend a coffee (or all of your savings): paypal.me/detjen
