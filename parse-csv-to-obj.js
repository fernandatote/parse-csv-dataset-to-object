//Parse CSV dataset to object structure

//dataset with comma separate values
let csvData = `id,first name,last name,email
1,jane,doe,wildmirror@yahoo.com
2,john,doe,tamepool@hotmail.com
3,sherlock,holmes,mag@glass.com
4,natalia,romanov,8legged@ninja.com
5,peter,quill,starlord@gmail.com`;

// Function that takes a string of CSV data like above, then returns it parsed into a more useful array of objects data structure.

function parseCSV(data) {

  let records = data.split('\n'); //create array based on each line
  let results = [];

  for (let record of records) {
    results.push(record.split(',')); //create second level of array based on commas
  }

  let headers = results[0]; //get headers from first record (line)
  results.splice(0, 1); //remove headers line from results array

  let dataResult = [];
  let header1 = headers[0];
  let header2 = headers[1];
  header2 = header2.split(" ");
  header2 = header2[0] + capitalize(header2[1]); //make it without spaces and camel case
  let header3 = headers[2];
  header3 = header3.split(" ");
  header3 = header3[0] + capitalize(header3[1]); //make it without spaces and camel case
  let header4 = headers[3];


  for(let record of results) {
    let decorator = {}; //create an object for each record

    for(let field of record) {
      if(record.indexOf(field) === 0) { //get the header of each field and attach as a property to the values
        decorator[header1] = field; //assign value to each property according to headers given
      } else if(record.indexOf(field) === 1) {
        decorator[header2] = field;
      } else if(record.indexOf(field) === 2) {
        decorator[header3] = field;
      } else {
        decorator[header4] = field;
      }
    }
    dataResult.push(decorator);
  }
  return dataResult;
}

//function call to parse and get result
let users = parseCSV(csvData);
console.log("users: ", users);


// CAMELCASE RECORDS HEADERS -----------------------------

//function to capitalize and make header camelCase
function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

for(let user of users) {
  user.firstName = capitalize(user.firstName);
  user.lastName = capitalize(user.lastName);
}

// console.log("users capitalized: ", users);


// SEARCH RECORDS ----------------------------------------

//option 1 - search records (capitalized or not) without hardcoding the properties
function search(dataSet, searchWord) {

  //if is not email, capitalize name
  if ( !searchWord.includes("@") ) {
    searchWord = capitalize(searchWord);
  }

  for(let row of dataSet) {
    for(let item in row) {
      let position = row[item].indexOf( searchWord );

      //if nothing is found returns -1
      if(position > -1) {
        return row;
      }
    }
  }
}

//---------

//option 2 - search records (capitalized or not) hardcoding properties
// function search(dataSet, searchWord) {

//   for(let item of dataSet) {
//     if(item.id === searchWord || item.firstName === searchWord || item.lastName === searchWord || item.email === searchWord || item.firstName === capitalize(searchWord) || item.lastName === capitalize(searchWord)) {
//       return item;
//     }
//   }
// }


// search(users, 'Romanov');
// search(users, 'Peter');
// search(users, 'mag@glass.com');
// search(users, '1');
search(users, 'sherlock');
