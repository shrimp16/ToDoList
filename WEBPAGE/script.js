import { item } from "./src/items.js";
import { getItems } from './src/items.js';

document.body.onload = () => {
    //getItems();
}

$('#button').click(() => {
    let test = new item("test", "descriptioin");
    console.log(test.desc);
    console.log(test.item);
})