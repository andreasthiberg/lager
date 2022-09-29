import { useState, useEffect } from 'react';
import { Base, Typography, Forms } from '../styles';
import invoiceModel from "../models/invoices";
import orderModel from "../models/orders"
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";


export default function InvoiceForm( {navigation}:any) {

    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [invoicePossible, setInvoicePossible] = useState(false);

    async function createInvoice() {
        await invoiceModel.addInvoice(invoice);
        navigation.navigate("List", { reload: true });
    }

    return (
        <ScrollView>
            <View style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Skapa faktura</Text>

            <Text style={{ ...Typography.label }}>Välj order</Text>
            <OrderDropdown
                invoice={invoice}
                setInvoice ={setInvoice}
            />
            <Text style={{ ...Typography.label }}>Välj förfallodatum</Text>
            <DateDropDown
                invoice={invoice}
            />
            <Button
                title="Skapa faktura"
                onPress={() => {
                    createInvoice();
                }}
            />

            </View>
        </ScrollView>
    );
}

function OrderDropdown(props: any) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect( () => {
        const invoiceFunction = async () => {
            setOrders(await orderModel.getOrders());    
        }
        invoiceFunction();
    }, []);

    /* Add initial value from order picker */
    useEffect( () => {
        if(typeof orders[0] !== "undefined"){
            props.setInvoice({...props.invoice, order_id: orders[0].id})
        }
    }, [orders]);

    const itemsList = orders.map((order, index) => {
            if(order.status_id === 200 || order.status_id === 400){   
                return <Picker.Item key={index} label={order.id + " - " + order.name} value={order.id} />;
            }
    })

        return (
            <Picker
                style={{ ...Forms.picker }}
                selectedValue={props.invoice?.order_id}
                onValueChange={(itemValue) => {
                    props.setInvoice({ ...props.invoice, order_id: itemValue });
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

                        props.setInvoice({ 
                            ...props.invoice,
                            due_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}