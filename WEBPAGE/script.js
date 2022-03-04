import { item } from "./src/items.js";
import { getItems } from './src/items.js';

let prio;

document.body.onload = () => {
    getItems();
}

$('#button').click(() => {
    let test = new item("test", "descriptioin");
    console.log(test.desc);
    console.log(test.item);
})

$('#low').click(() => {
    prio = 'Low';
    createItem();
})

$('#medium').click(() => {
    prio = 'Medium';
    createItem();
})

$('#high').click(() => {
    prio = 'High';
    createItem();
})

function createItem() {
    let desc = document.getElementById('desc').value;
    let title = document.getElementById('title').value;
    let newItem = new item(title, desc);
    newItem.addItem(newItem, prio);
}