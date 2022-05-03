import config from "../config/config.json";

const products = {
    /* Change the stock of a specific product */
    changeStock: async function changeStock(item : OrderItem) {  
        let product_id = item["product_id"];
        let product_name = item["name"];
        let api_key = config.api_key;
        let new_stock = item["stock"] - item["amount"];

        let changed_product = {
            "id": product_id,
            "name": product_name,
            "api_key": api_key,
            "stock": new_stock
        };
        
        fetch(`${config.base_url}/v2/products`, {
            body: JSON.stringify(changed_product),
            headers: {
              'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {
        });
    }
};
   
export default products;