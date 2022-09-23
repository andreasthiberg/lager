import config from "../config/config.json";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(newDelivery: any){
        if(!newDelivery.hasOwnProperty('delivery-date')){
            newDelivery['delivery_date'] = new Date().toJSON().slice(0, 10);
        }
        newDelivery.api_key = `${config.api_key}`;
        console.log(newDelivery);

        fetch("https://lager.emilfolino.se/v2/deliveries", {
        body: JSON.stringify(newDelivery),
        headers: {
        'content-type': 'application/json'
        },
        method: 'POST'
        })
    }
};


   
export default deliveries;