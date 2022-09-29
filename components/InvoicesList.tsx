import { DataTable } from "react-native-paper";
import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import invoiceModel from "../models/invoices";
import deliveryModel from "../models/deliveries";
import { Base, Typography} from '../styles';

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
        tableOfInvoices = InvoiceTable(allInvoices);
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

function InvoiceTable(invoices: any) {

    const table = invoices.map((invoice: any, index: number) => {
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{invoice.id}</DataTable.Cell>
              <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
              <DataTable.Cell> {invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Order ID</DataTable.Title>
                <DataTable.Title>Total Price</DataTable.Title>
                <DataTable.Title>Due date</DataTable.Title>
            </DataTable.Header>
            {table}
        </DataTable>
    );
}