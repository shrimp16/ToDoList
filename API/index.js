const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.listen(3000);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

function addTo(priority, newItem) {
    let file;
    switch (priority) {
        case 'High':
            file = './items/highPrio.json';
            break;
        case 'Medium':
            file = './items/mediumPrio.json';
            break;
        case 'Low':
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

app.delete('/done/:prio/:id', (req, res) => {
    let file;
    switch(req.params.prio){
        case 'High':
            file = './items/highPrio.json';
            break;
        case 'Medium':
            file = './items/mediumPrio.json';
            break;
        case 'Low':
            file = './items/lowPrio.json';
            break;
    }
    let currentFile = JSON.parse(fs.readFileSync(file));
    console.log(currentFile);
    let id = parseInt(req.params.id);
    if(id === 0){
        currentFile.shift();
        console.log(currentFile);
    }else{
        currentFile.splice(id, id++);
        console.log(currentFile);
    }
    console.log(currentFile);
    fs.writeFile(file, JSON.stringify(currentFile), err => {
        if (err) throw err;
        console.log("nuked");
    });

    res.send("Success!")
    
})

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
