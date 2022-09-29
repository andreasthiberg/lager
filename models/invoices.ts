import config from "../config/config.json";
import storageModel from "./storage";
import orderModel from "./orders";

const invoices = {
    getInvoices: async function getInvoices() {
        const tokenStorage  = await storageModel.readToken();

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': tokenStorage.token
            }
        });
        const result = await response.json();

        return result.data;
    },
    addInvoice: async function addInvoice(invoice: any){
        let newInvoice = {...invoice};
        newInvoice.total_price = await this.getTotalPriceOfOrder(invoice.order_id)
        const tokenStorage  = await storageModel.readToken();
         if(!newInvoice.hasOwnProperty('due_date')){
            let dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + 1);
            newInvoice['due_date'] = dueDate.toJSON().slice(0, 10);
        }
        newInvoice.creation_date = new Date().toJSON().slice(0, 10);
        newInvoice.api_key = `${config.api_key}`;

        const response = await fetch("https://lager.emilfolino.se/v2/invoices", {
        body: JSON.stringify(newInvoice),
        headers: {
        'content-type': 'application/json',
        'x-access-token': tokenStorage.token
        },
        method: 'POST'
        });

        const order = await orderModel.getSingleOrder(invoice.order_id);
        await orderModel.updateOrderStatus(order, 600)

    },
    getTotalPriceOfOrder: async function getTotalPriceOfOrder(order_id: number) {
        const order = await orderModel.getSingleOrder(order_id);
        let order_items: any = order.order_items;
        let sum = 0;
        for (let key in order_items){
            let item = order_items[key];
            sum += item.amount * item.price;
        }
        return sum;
    },
    checkForPossibleInvoices: async function checkForPossibleInvoices() {
        const orders = await orderModel.getOrders();
        let possibleInvoice = false;
        for (let key in orders){
            if(orders[key].status_id === 200 || orders[key].status_id === 400){
                possibleInvoice = true;
            }
        }
        return possibleInvoice;
    }
};
   
export default invoices;