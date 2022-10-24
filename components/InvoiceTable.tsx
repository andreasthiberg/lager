import { DataTable } from "react-native-paper";

export default function InvoiceTable({invoices}: any) {
    console.log(invoices);
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