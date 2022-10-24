import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../styles';
import { useEffect, useState } from "react";

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import getCoordinates from "../models/nominatim"
import { showMessage } from "react-native-flash-message";

export default function ShipSingleOrder({ route } :any) {
    console.log(route);
    const {order} = route.params;
    const [marker, setMarker] = useState(<Marker
        coordinate={{ latitude: 0, longitude: 0 }}
        title={""}
    />);
    const [locationMarker, setLocationMarker] = useState(<Marker
        coordinate={{ latitude: 0, longitude: 0 }}
        title={""}
    />);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);
            if (results.length === 0){
                showMessage({
                    message: "Adressfel",
                    description: "Koordinater gick inte att hitta för leveransadressen",
                    type: "danger",
                });
                return;
            }
            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    const orderItemsList = order.order_items.map((item : any, index : any) => {
        return <Text
                key={index}
                >
                    {item.name} - {item.amount}st - Hylla: {item.location}
            </Text>;
    });


    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.334591,
                        longitude: 18.063240,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
            <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>
            <Text></Text>
            <Text style={Base.subtitle}>Produkter:</Text>
            <Text>{errorMessage}</Text>
            {orderItemsList}
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        margin: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});