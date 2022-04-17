const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animal } = require('../../data/animals');


router.get('/animals', (req, res) => {
    let results = animal;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});


router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animal);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});


router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animal.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animal);
        res.json(animal);
    }
});


module.exports = router;