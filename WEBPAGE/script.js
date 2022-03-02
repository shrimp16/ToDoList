import { item } from "./src/items.js";

document.body.onload = () => {
    fetch('http://192.168.1.103:3000/items')
    .then(response => response.json())
    .then((response) => console.log(response));
}

$('#button').click(() => {
    let test = new item("test", "descriptioin");
    console.log(test.desc);
    console.log(test.item);
    test.addItem(test, 'high');
})