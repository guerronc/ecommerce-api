const { MongoClient, ObjectId } = require("mongodb");
const config = require("../config/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost0}:${config.dbPort},${config.dbHost1}:${config.dbPort},${config.dbHost2}:${config.dbPort}/${DB_NAME}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if (error) {
            reject(error);
          }
          console.log("Connected succesfully to mongo");
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => {
        return result.insertedId;
      });
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => {
        return result.upsertedId || id;
      });
  }

  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) });
    })
    .then(() => {
      return id;
    });
  }
}

module.exports = MongoLib;
