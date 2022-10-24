import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import deliveryModel from "../models/deliveries";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { showMessage } from 'react-native-flash-message';


export default function DeliveryForm({ navigation, setProducts }: {navigation:any, setProducts:any}) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {

        if(delivery.amount === undefined){
            showMessage({
                message: "Antal saknas",
                description: "Fyll i antalet i leveransen",
                type: "warning",
            });
            return;
        }
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }
    return (
        <ScrollView>
            <View style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    let amount;
                    if(content===""){
                        amount = undefined;
                    } else {
                        amount = parseInt(content);
                    }
                    setDelivery({ ...delivery, amount: amount })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />
            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
            </View>
        </ScrollView>
    );
};

function ProductDropDown(props: any) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect( () => {
        const productFunction = async () => {
            setProducts(await productModel.getProducts());
        }
        productFunction();
    }, []);

    useEffect( () => {
        if(typeof products[0] !== "undefined"){
            props.setDelivery({...props.delivery, product_id: products[0].id})
        }
    }, [products]);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });


    return (
        <Picker
            style={{ ...Forms.picker }}
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props: any) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    style={{ ...Forms.datePicker }}
                    onChange={(event: any, date : any) => {
                        setDropDownDate(date);

                        props.setDelivery({ 
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}