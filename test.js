const express = require('express');

const main = require('./main');
const dsa = require('./derivedStatAdder');
const fs = require('fs');
const api = express();

fs.readdirSync('./players', function (err, list) {
    for (var i = 0; i < list.length; i++) {
        if (fs.existsSync(`./players/${list[i]}`)) {
            fs.unlink(`./players/${list[i]}`, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }
}) 

main.readCSV();
dsa.derivedStats();

api.listen(4200, () => { });

api.get('/', (req, res) => {
    fs.readdir('./players', function (err, list) {
        let msg = "";
        for (var i = 0; i < list.length; i++) {
            msg += `<a href = "/${list[i]}">${list[i].split('-').join(' ').split(".json").join("")}</a><br>`;
        }
        res.send(msg);
    });
});

api.use((req, res) => {
    // console.log(`requested ${req.url}`);
    res.sendFile(`./players/${req.url}`, { root: __dirname });
})
