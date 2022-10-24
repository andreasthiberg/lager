import { useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

export default function StockList({products, setProducts}: any) {

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product: any, index: any) => <Text key={index} style={{marginTop: 10, borderWidth: 2, padding: 3}}>{ product['name'] } - Lagersaldo: { product['stock'] } </Text>);

  return (
    <View style={{marginTop: 20}}>
      {list}
    </View>
  );
}
