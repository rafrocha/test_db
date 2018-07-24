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
let firstName = args[2];
let lastName = args[3];
let dob = args[4];

function addFamousPeople(fn, ln, dob) {
      console.log('Adding...');
      knex.insert({first_name: fn, last_name: ln, birthdate: dob }).into('famous_people')
    .finally(function() {
      knex.destroy();
    });
}

addFamousPeople(firstName, lastName, dob);