import * as itemManager from './src/items.js';
import * as colors from './src/colors.js';

let border = document.getElementById('card');

let prio;

document.body.onload = () => {
    itemManager.getItems();
}

$('#low').click(() => {
    prio = 'Low';
    border.style.border = colors.GREEN_BORDER;
})

$('#medium').click(() => {
    prio = 'Medium';
    border.style.border = colors.YELLOW_BORDER;
})

$('#high').click(() => {
    prio = 'High';
    border.style.border = colors.RED_BORDER;
})

$('#submit').click(() => {
    border.style.border = colors.DEFAULT_BORDER;
    createItem();
})

function createItem() {
    let desc = document.getElementById('desc-input').value;
    let title = document.getElementById('title-input').value;
    let newItem = new itemManager.item(title, desc);
    itemManager.addItem(newItem, prio);
}