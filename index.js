const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOpr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

mongoClient.connect(url).then((client) => {

        // assert.equal(err, null);

        console.log('Connected correctly to server');

        const db = client.db(dbName);

        dbOpr.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes')
            .then((result) => {
                console.log('Insert Document:\n', result.ops);
                return dbOpr.findDocuments(db, 'dishes')
            })
            .then((docs) => {
                console.log('Found Documents:\n', docs);
                return dbOpr.updateDocument(db, { name: 'Vadonut' }, { description: ' updation of description' }, 'dishes')
            })
            .then((result) => {
                console.log('Updated document:\n', result.result);
                return dbOpr.findDocuments(db, 'dishes')
            })
            .then((docs) => {
                console.log('Found Updated Documents:\n', docs);
                return db.dropCollection('dishes')
            })
            .then((result) => {
                console.log('Dropped Collection: ', result);
                return client.close();
            })
            .catch((err) => console.log(err));

    })
    .catch((err) => console.log(err));