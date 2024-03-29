import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import invoiceModel from "../models/invoices";
import { Base, Typography} from '../styles';
import InvoiceTable from "./InvoiceTable";

export default function InvoicesList({ route, navigation }: {route:any;navigation:any}) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);
    const [invoicePossible, setInvoicePossible] = useState(false);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    async function checkInvoicePossible() {
        setInvoicePossible(await invoiceModel.checkForPossibleInvoices())
    }

    useEffect(() => {
        reloadInvoices();
        checkInvoicePossible();
    }, []);

    let tableOfInvoices;

    if(allInvoices.length == 0 ){
        tableOfInvoices = <Text>Inga leveranser än!</Text>
    } else {
        tableOfInvoices = <InvoiceTable invoices={allInvoices} />
    }

    /* Check if possible invoices available */
    let createInvoiceButton;
    if (invoicePossible){
        createInvoiceButton = <Button
        title="Skapa ny faktura"
        onPress={() => {
                navigation.navigate('Form');
        }}
        />;
    } else {
        createInvoiceButton = <Text>Inga fler möjliga fakturor.</Text>
    }


    
    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            {tableOfInvoices}
            {createInvoiceButton}
        </View>
        </ScrollView>
    );

}
