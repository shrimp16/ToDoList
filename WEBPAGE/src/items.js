const priority = ["High", "Medium", "Low"];

export class item {
    constructor(item, desc){
        this.item = item;
        this.desc = desc;
    }
    
    addItem(item, prio){
        fetch(`http://192.168.1.103:3000/newItem/${prio}`, {
            method: 'POST',
            body: JSON.stringify({
                "item": item.item,
                "desc": item.desc
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then((answer) => {
            console.log(answer);
        })
    }
}

export function getItems() {
    fetch(`http://192.168.1.103:3000/items`)
    .then(response => response.json())
    .then((response) => showItems(response));
}

function showItems(response) {
    console.log(response);
    document.getElementById("body").innerHTML = '';
    for(let i = 0; i < response.length; i++){
        for(let b = 0; b < response[i].length; b++){
            console.log(response[i][b]);
            document.getElementById("body").innerHTML += `<div class="card">
            <div class="title">
                <h1>${response[i][b].item}</h1>
                <h3>Priority: ${priority[i]}</h3>
            </div>
            <div class="desc">
                <p>${response[i][b].desc}</p>
            </div>
        </div>`
        }
    }
}