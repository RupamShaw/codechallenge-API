const { promisify } = require('util');
const fs = require('fs')
const readFileSync = promisify(fs.readFile)
const writeFileSync = promisify(fs.writeFile)
const userAuthenthentication = require('./authenticate');

module.exports = function (app) {

    function getPeopleById(peopleArray, id) {
        peopleJSON = [];
        for (var i = 0; i < peopleArray.length; i++) {
            if (peopleArray[i].id == id) {
                peopleJSON.push(peopleArray[i])
            }
        }
        return peopleJSON;
    }

    function deletePeopleById(peopleArray, id) {
        var index = null;
        for (var i = 0; i < peopleArray.length; i++) {
            if (peopleArray[i].id == id) {
                index = i;
                break;
            }
        }
        if (index !== null) {
            peopleArray.splice(index, 1);
        }

        return peopleArray;
    }

    app.delete('/people/:id', (req, res) => {
        if (userAuthenthentication(req, res)) {
            const id = req.params.id;
            readFileSync('fixtures/people.json')
                .then(contents => {
                    let json = JSON.parse(contents)
                    json = deletePeopleById(json, id)
                    let jsonfile = JSON.stringify(json, null, 2);
                    writeFileSync("fixtures/people.json", jsonfile).then(function () {
                        res.send('people data deleted');
                    })
                })
                .catch(error => {
                    throw error
                    res.send('err ' + error);
                })
        } else {
            console.log('Need Authenthentication');
        }
    })

    app.get('/people', (req, res) => {
        if (userAuthenthentication(req, res)) {
            readFileSync('fixtures/people.json')
                .then(contents => {
                    let peopleJson = JSON.parse(contents)
                    res.json(peopleJson)
                })
                .catch(error => {
                    throw error
                    res.json(error)
                })
        } else {
            console.log('Need Authenthentication');
        }
    });

    app.get('/people/:id', (req, res) => {
        if (userAuthenthentication(req, res)) {
            const id = req.params.id;
            readFileSync('fixtures/people.json')
                .then(contents => {
                    let json = JSON.parse(contents)
                    json = getPeopleById(json, id)
                    res.json(json)
                })
                .catch(error => {
                    throw error
                    res.send('err ' + error);
                })
        } else {
            console.log('Need Authenthentication');
        }
    })

    app.post('/people', (req, res) => {
        if (userAuthenthentication(req, res)) {
            let entry = req.body;
            if ((typeof entry === "object") && (entry !== null) && (entry instanceof Object)) {
                if (entry.id !== undefined) {
                    readFileSync('fixtures/people.json')
                        .then(contents => {
                            let json = JSON.parse(contents)
                            json.push(entry);
                            let jsonfile = JSON.stringify(json, null, 2);
                            writeFileSync("fixtures/people.json", jsonfile).then(function () {
                                res.send('People data saved');
                            })
                        })
                        .catch(error => {
                            throw error
                            res.send('err ' + error);
                        })

                } else {
                    res.send('Enter valid object with id');
                }
            } else {
                res.send('Type valid object with id ');
            }
        } else {
            console.log('Need Authenthentication');
        }
    });

};