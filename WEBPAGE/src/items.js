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
    fetch(`http://192.168.1.103/items`);
}