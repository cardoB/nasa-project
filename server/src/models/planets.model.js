/*
  This script reads data from a CSV file containing information about exoplanets
  discovered by the Kepler Space Telescope. It filters the planets to find those
  that are potentially habitable based on specific criteria:
  1. The planet must be confirmed (koi_disposition).
  2. The planet must receive an insolation flux (koi_insol) between 0.36 and 1.11 times
     that of Earth.
  3. The planet must have a radius (koi_prad) less than 1.6 times that of Earth.
  
  The script uses the 'csv-parse' library to parse the CSV file and 'fs' library to
  read the file. It outputs the number of habitable planets found and their names.
  
  Author: Your Name
  Date: YYYY-MM-DD
 */

  // Build in libraries
const fs = require('fs'); // Import the file system library
const path = require('path');

// third party library
const { parse } = require('csv-parse'); // Import the csv-parse library

const habitablePlanets = []; // Array to store habitable planets

/*
  Function to check if a planet meets the habitable criteria.
  @param {Object} planet - The planet data object.
  @returns {boolean} - True if the planet is habitable, false otherwise.
 */
function isHabitable(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#', // Ignore lines starting with #
                columns: true // Treat the first row as column names
            }))
            .on('data', (data) => {
                // Check if the planet is habitable and add to the array if it is
                if (isHabitable(data)) {
                    habitablePlanets.push(data);
                }
            })
            .on('end', () => {
                // When the file has been completely read
                console.log(`${habitablePlanets.length} habitable planets found!`);
                // Print the names of the habitable planets
                resolve();
            })
            .on('error', (e) => {
                // Handle any errors during the file reading or parsing process
                console.error(e);
                reject(error);
            });
    });
}


module.exports = {
    loadPlanetsData,
    planets: habitablePlanets,
};


/*

How to polulate our server with data on startup.
module.exports doesn't wait for the stream to get the file.

Promises:
new Promise();
*/