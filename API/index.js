const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.listen(3000);
app.use(bodyParser.json());

function addTo(priority, newItem) {
    let file;
    switch (priority) {
        case 'high':
            file = './items/highPrio.json';
            break;
        case 'medium':
            file = './items/mediumPrio.json';
            break;
        case 'low':
            file = './items/lowPrio.json';
            break;
    }
    let currentFile = fs.readFileSync(file);
    currentFile = JSON.parse(currentFile);
    currentFile.push(newItem);
    fs.writeFile(file, JSON.stringify(currentFile, null, 2), (err) => {
        if(err) return ("Something went wrong!");
        console.log('Added a new to do item to the list');
    })

    return "Success!";

}

app.get('/items', (req, res) => {
    let lowPrioItems = JSON.parse(fs.readFileSync('./items/lowPrio.json'));
    let mediumPrioItems = JSON.parse(fs.readFileSync('./items/mediumPrio.json'));
    let highPrioItems = JSON.parse(fs.readFileSync('./items/highPrio.json'));

    let allItems = [];
    allItems.push(highPrioItems);
    allItems.push(mediumPrioItems);
    allItems.push(lowPrioItems);
    res.send(allItems);
})

app.post('/newItem/:prio', (req, res) => {
    let newItem = {
        item: req.body.item,
        desc: req.body.desc
    };
    let answer = addTo(req.params.prio, newItem);
    res.send(answer);
})
