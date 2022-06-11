const express = require('express');
const {fileService} = require("./services");

const app = express();

app.use(express.json());

app.get('/cats', async (req, res) => {
    const cats = await fileService.reader();
    res.json(cats);
});

app.get('/cats/:catId', async (req, res) => {
    const {catId} = req.params;

    const cats = await fileService.reader();

    const cat = cats.find((cat) => cat.id === +catId);

    if (!cat) {
        return res.status(404).json(`Not found cat with id ${catId}`);
    }
    await fileService.writer([...cats, cat]);
    res.json(cat);
});

app.post('/cats', async (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json('Select valid name');
    }
    if (!age || !Number.isInteger(age)) {
        return res.status(400).json('Select valid age');
    }
    const cats = await fileService.reader();

    const newCat = {...req.body, id: cats.length ? cats[cats.length - 1].id + 1 : 1};

    res.status(201).json(newCat);
    await fileService.writer([...cats, newCat]);
});

app.delete('/cats/:catId', async (req, res) => {
    const {catId} = req.params;

    const cats = await fileService.reader();

    const index = cats.findIndex((cat) => cat.id === +catId);
    if (index === -1) {
        return res.status(404).json(`Not found cat with id ${catId}`);
    }

    cats.splice(index, 1);

    res.status(204).json(`Cat with id ${catId} was deleted`);
    await fileService.writer(cats);
});

app.put('/cats/:catId', async (req, res) => {
    const {catId} = req.params;
    const {name, age} = req.body;

    if (name.length < 2) {
        return res.status(404).json('Enter valid name');
    }
    if (!Number.isInteger(age)) {
        return res.status(400).json('Enter valid age');
    }

    const cats = await fileService.reader();
    const index = cats.findIndex((cat) => cat.id === +catId);
    if (index === -1) {
        return res.status(404).json(`Not found car with id ${catId}`)
    }

    const newCat = {...cats[index], ...req.body};

    cats.splice(index, 1);

    res.status(201).json(`Cat with id ${catId} successfully updated`);
    await fileService.writer([...cats, newCat]);
});

app.listen(5000, () => {
    console.log('you listen port 5000');
});