import { Text, View, ScrollView, Image } from 'react-native';
import skivor from '../assets/skivor.jpg';
import Stock from '../components/Stock';
import { Base } from '../styles';

export default function Home({products, setProducts}:any) {
    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={Base.title}>Skivbutiken</Text>
            <Image source={skivor} style={{ width: 240, height: 120, marginTop: 30}} />
            <Stock products={products} setProducts={setProducts} />
        </View>
        </ScrollView>
    );
}

