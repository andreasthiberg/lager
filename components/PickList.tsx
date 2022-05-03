import { View, Text, Button } from "react-native";
import orderModel from "../models/orders";

export default function PickList({ route, navigation }: {route: any; navigation: any}) {
    const { order } = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        navigation.navigate("List", { reload: true });
    }

    const orderItemsList = order.order_items.map((item : any, index : any) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount}st - Hylla: {item.location}
            </Text>;
    });

    //Check if order is possible
    let orderPossible = true;
    let order_items = order["order_items"];

    for (let single_item of order_items){
        if (single_item["amount"] > single_item["stock"]){
            orderPossible = false;
        }
    }

    //Create button or text based on possibility
    let action;
    if(orderPossible){
        action = <Button title="Plocka order" onPress={pick} />;
    } else {
        action = <Text>Order inte möjligt</Text>
    }

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>
            <Text>{order.status}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            {action}


        </View>
    )
};