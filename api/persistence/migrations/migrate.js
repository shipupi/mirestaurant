const {Client} = require('pg');
const fs = require('fs');
const stdio = require('stdio');
const ops = stdio.getopt({
    'reset': {key: 'r', description: 'Delete all tables'},
    'migrate': {key: 'm', description : "Migrate tables"},
    'seed': {key: 's', description: 'Seed tables'},
    'full': {key: 'f', description: 'Migrate and seed'}
});
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(`.env.${process.env.NODE_ENV}`)
})

let connectionString = process.env.DATABASE_URL;
let client = new Client({
    connectionString
})
const create_sql = fs.readFileSync(path.resolve(__dirname,'./create_tables.sql')).toString();
const reset_sql = fs.readFileSync(path.resolve(__dirname,'./reset.sql')).toString();
const seed_sql = fs.readFileSync(path.resolve(__dirname,'./seed.sql')).toString();
client.connect();    
let sql = create_sql;
if (ops.reset) {
    sql = reset_sql
} else if(ops.seed) {
    sql = seed_sql
} else if (ops.migrate) {
    sql = create_sql;
}

client.query(sql, function(err, result){
    if(err){
        console.log('error: ', err);
        process.exit(1);
    }
    process.exit(0);
});