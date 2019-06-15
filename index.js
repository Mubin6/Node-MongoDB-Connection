const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOpr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';

mongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbName);

    /** First Method to connect with mongoDB and its operation  */

    /* const collection = db.collection('dishes');

    collection.insertOne({ "name": "Fruit Custard", "description": "With two scoops of butterscotch..." }, (err, result) => {
        assert.equal(err, null);

        console.log('After Insert \n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log('Found: \n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            })
        });
    }); */

    /** Second Method to connect with mongoDB and its operation  */

    dbOpr.insertDocument(db, { name: 'Vadonut', description: 'Test' }, 'dishes', (result) => {
        console.log('Insert Document:\n', result.ops);
        dbOpr.findDocuments(db, 'dishes', (docs) => {
            console.log('Found Documents:\n', docs);
            dbOpr.updateDocument(db, { name: 'Vadonut' }, { description: ' updation of description' }, 'dishes', (result) => {
                console.log('Updated document:\n', result.result);
                dbOpr.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found Updated Documents:\n', docs);
                    db.dropCollection('dishes', (result) => {
                        console.log('Dropped Collection: ', result);
                        client.close();
                    });
                });
            });
        });
    });

});