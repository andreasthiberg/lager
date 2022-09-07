
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import deliveryModel from "../models/deliveries";
import { Base, Typography} from '../styles';

export default function DeliveriesList({ route, navigation }: {route:any;navigation:any}) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    let listOfDeliveries;

    if(allDeliveries.length == 0 ){
         listOfDeliveries = <Text>Inga leveranser än!</Text>
    } else {
        
        listOfDeliveries = allDeliveries.map((delivery, index) => {
            return <Text style={{margin: 20}} key={index}>ID: {delivery['id']} AMOUNT: {delivery['amount']} PRODUCT: {delivery['product_name']} COMMENT: {delivery['comment']}</Text>
        });

    }
    
    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
        </ScrollView>
    );

}