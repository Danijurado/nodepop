# Nodepop

Website and API application.

## Install

Install dependencies:

```sh
$ npm install
```

Review database connection on /lib/connectMongoose.js 

Load initial data:

```sh
# this command deletes all the data in the database and create default data
$ npm run init-db
```

## Start

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```

## Start a MongoDB Server in MacOS or Linux

From the folder of the server:

```sh
./bin/mongod --dbpath ./data
```

## API Endpoints

### GET /api/advertisements

```json
{
    "results": [
        {
            "_id": "651c92bd91b8f58232cda7ff",
            "name": "Apple watch SE",
            "type": "sell",
            "price": 100,
            "image":"apple_watch.jpg",
            "tags":["lifestyle"]
        }
    ]
}
```