const settings = require("./settings"); // settings.json
const moment = require('moment');
moment().format();


const knex = require("knex")({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
  },
});

let args = process.argv;


let target = args[2];
let values = target;

function errorHandling(err) {
  if (err) {
    return console.error("Error:", err);
  }
}

function getDataByName(name) {
  knex.select('*').from('famous_people').where('first_name', '=', name)
    .asCallback(function(err, rows) {
      errorHandling(err);
      console.log('Searching...');
      console.log(`Found ${rows.length} person(s) by the name '${name}:`);
      rows.forEach(function(row, index) {
        console.log(`- ${index+1}: ${row.first_name} ${row.last_name}, born '${moment(row.birthdate).format("YYYY MM DD")}'`);
      })
    })
    .finally(function(){
        knex.destroy();
      });
}

getDataByName(values);
