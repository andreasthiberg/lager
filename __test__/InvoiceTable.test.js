jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
import { render } from '@testing-library/react-native';
import InvoiceTable from '../components/InvoiceTable';

const invoices = [
    { id: 1002, total_price: 900, due_date: "2022-12-31" },
    { id: 1003, total_price: 1200, due_date: "2022-11-30" }
];

test('Invoice list should contain two invoices with correct info', async () => {
    const { getByText } = render(<InvoiceTable invoices={invoices} />);

    const firstInvoiceId = await getByText('1002', { exact: false });
    const secondInvoiceId = await getByText('1003', { exact: false });
    const firstInvoicePrice = await getByText('900', { exact: false });
    const secondInvoicePrice = await getByText('1200', { exact: false });
    const firstInvoiceDue = await getByText('2022-12-31', { exact: false });
    const secondInvoiceDue = await getByText('2022-11-30', { exact: false });

    expect(firstInvoiceId).toBeDefined();
    expect(secondInvoiceId).toBeDefined();
    expect(firstInvoicePrice).toBeDefined();
    expect(secondInvoicePrice).toBeDefined();
    expect(firstInvoiceDue).toBeDefined();
    expect(secondInvoiceDue).toBeDefined();
});
