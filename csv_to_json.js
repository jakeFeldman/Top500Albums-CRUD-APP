'use strict';

const fs = require('fs');
const csv = require('csv');

// File system reads the csv files located at the relative path
fs.readFile('./seeds/albumlist.csv', (error, data) => {
  // csv.parse uses npm csv to parse the csv file.
  csv.parse(data, (error, data) => {
    // Define empty object to store the data
    let top_500_albums = [];

    // Iterate through the data in the csv file
    // Start at one to skip the header
    for (var i = 1; i < data.length; i++) {
      // create each row of data
      let row = data[i];
      // Define the album rating, located at the first index of the row array
      // const albumOrder = row[0];
      // Define the parent object (titled albums) and set each object to the individual
      // albums rating, inside this create an empy array to store the album info

      // Define the individual album object and set each paramater equal to its
      // corrisponding index inside its row array
      let record = {
        rating: row[0],
        album: row[1],
        artist: row[2],
        year: row[3],
        genre: []
      }

      // Interate through the final part of the row array to extract and push
      // the many to many relationship to its own array inside the object

      for (var j = 4; j < row.length; j++) {
        if (row[j]) {
          record.genre.push(row[j]);
        } else {
          break;
        }
      }

      // Push each record into the album array which is located inside the albums object
      top_500_albums.push(record);
    } //End first for loop
    // Write the new ojbect as a JSON file. stringify the object to ensure it is a proper JSON file format.
    fs.writeFile('./seeds/album_genre.json', JSON.stringify(top_500_albums), (error) => {
      console.log('album_genre.json created');
    });
  });
});
