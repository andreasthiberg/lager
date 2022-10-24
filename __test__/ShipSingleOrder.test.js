import { render } from '@testing-library/react-native';
import ShipSingleOrder from '../components/ShipSingleOrder';

const order = {
    "address": "Fredsgatan 7",
    "city": "Stockholm",
    "country": "Sverige",
    "id": 7636,
    "name": "Herr Statsminister",
    "order_items": [
    {
        "amount": 2,
        "article_number": "CD-4",
        "description": "Pop classic by Michael Jackson",
        "location": "A4",
        "name": "Thriller",
        "price": 150,
        "product_id": 28873,
        "specifiers": "{runtime:140,tracks:10}",
        "stock": 118,
      },
    {
        "amount": 5,
        "article_number": "CD-5",
        "description": "New Wave music by Talking Heads",
        "location": "A5",
        "name": "Remain in Light",
        "price": 110,
        "product_id": 28874,
        "specifiers": "{runtime:60,tracks:9}",
        "stock": 1352,
      },
    ],
    "status": "Packad",
    "status_id": 200,
    "zip": "111 52",
}

const route = {params: { order: order}}

test('Single order ship page should have adress and product list', async () => {
    const { getByText } = render(<ShipSingleOrder route={route} />);

    const product1 = await getByText('Thriller', { exact: false });
    const product2 = await getByText('Remain in Light', { exact: false });
    const name = await getByText('Herr Statsminister', { exact: false });
    const adress = await getByText('Fredsgatan', { exact: false });

    expect(product1).toBeDefined();
    expect(product2).toBeDefined();
    expect(name).toBeDefined();
    expect(adress).toBeDefined();
});
