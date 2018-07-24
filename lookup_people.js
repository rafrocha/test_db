const pg = require("pg");
const settings = require("./settings"); // settings.json
var moment = require('moment');
moment().format();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let args = process.argv;

client.connect((err) => {
  let target = args[2];
  let values = target;
  errorHandling(err);
  getDataByName(values);
});

function errorHandling(err){
  if (err) {
      return console.error("Error:", err);
    }
}

function getDataByName(name){
  client.query("SELECT * FROM famous_people WHERE first_name=$1::text",[name], (err, result) => {
    errorHandling(err);
    console.log('Searching...');
    console.log(`Found ${result.rowCount} person(s) by the name '${name}:`);
    result.rows.forEach(function(row, index){
      console.log(`- ${index+1}: ${row.first_name} ${row.last_name}, born '${moment(row.birthdate).format("YYYY MM DD")}'`);
    })
    client.end();
  });
}