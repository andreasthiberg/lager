import { Text, View } from 'react-native';
import StockList from './StockList';

export default function Stock({products, setProducts}: any) {
  return (
    <View style={{marginTop: 50, backgroundColor: '#fff', padding: 20}}>
      <Text style={{color: '#333', fontSize: 24}}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
} 