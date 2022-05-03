import config from "../config/config.json";
import productModel from "./products";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: any) {  
        
        let id = order["id"];
        let name = order["name"];
        let api_key = config.api_key;
        
        //Create PUT Json
        let changed_order = {
            "id": id,
            "name": name,
            "api_key": api_key,
            "status_id": 100
        }

        fetch("https://lager.emilfolino.se/v2/orders", {
            body: JSON.stringify(changed_order),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {

        });

        //Change stock of picked items
        let picked_items = order["order_items"];
        for(let i = 0; i < picked_items.length; i++) {
            let item = picked_items[i];
            productModel.changeStock(item);
        }  

    }
};
   
export default orders;