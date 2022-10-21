import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from "./../models/orders";

export default function ShipOrderList({ route, navigation }: {route:any;navigation:any}) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order['status'] === "Packad")
        .map((order, index) => {
            return <Button
                title={order['name']}
                key={index}
                onPress={() => {
                    navigation.navigate('Skicka order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text>Ordrar redo att skickas!</Text>
            {listOfOrders}
        </View>
    );
}