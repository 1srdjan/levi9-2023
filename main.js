const fs = require('fs');
const { parse } = require('csv-parse');

// L9HomeworkChallengePlayersInput
function createJsonFile(fileName, playerName) {
    if (!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, JSON.stringify({
            "playerName": playerName,
            "gamesPlayed": 0,
            "traditional": {
                "freethrows": {
                    "attempts": 0,
                    "made": 0
                },
                "twoPoints": {
                    "attempts": 0,
                    "made": 0
                },
                "threePoints": {
                    "attempts": 0,
                    "made": 0
                },
                "points": 0,
                "rebounds": 0,
                "blocks": 0,
                "assists": 0,
                "steals": 0,
                "turnovers": 0
            }

        }, null, 2), () => { })
    };
    return true;
};

function readCSV() {
    

    fs.createReadStream("./L9HomeworkChallengePlayersInput.csv")
        .pipe(parse({
            delimiter: ",",
            columns: true,
            bom: true
        }))
        .on("data", function (row) {
            let fileName = `./players/${row['PLAYER'].split(' ').join('-')}.json`

            createJsonFile(fileName, row['PLAYER']);
            let hash = require(fileName);

            hash["gamesPlayed"] = hash["gamesPlayed"] + 1;

            hash["traditional"]["freethrows"]["attempts"] += parseInt(row["FTA"]);
            hash["traditional"]["freethrows"]["made"] += parseInt(row["FTM"]);

            hash["traditional"]["twoPoints"]["attempts"] += parseInt(row["2PA"]);
            hash["traditional"]["twoPoints"]["made"] += parseInt(row["2PM"]);

            hash["traditional"]["threePoints"]["attempts"] += parseInt(row["3PA"]);
            hash["traditional"]["threePoints"]["made"] += parseInt(row["3PM"]);

            hash["traditional"]["points"] += parseInt(row['FTM']) + 2 * parseInt(row['2PM']) + 3 * parseInt(row['3PM']);
            hash["traditional"]["rebounds"] += parseInt(row['REB']);
            hash["traditional"]["blocks"] += parseInt(row['BLK']);
            hash["traditional"]["assists"] += parseInt(row['AST']);
            hash["traditional"]["steals"] += parseInt(row['STL']);
            hash["traditional"]["turnovers"] += parseInt(row['TOV']);
            // base hash
            fs.writeFileSync(fileName, JSON.stringify(hash, null, 2));
        });
}
// readCSV();
exports.readCSV = readCSV;