import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import muttrar from '../assets/muttrar.jpg';
import Stock from '../components/Stock';
import { Base } from '../styles';

export default function Home() {
    return (
        <ScrollView>
        <View style={Base.base}>
        <Text style={Base.title}>Infinity Warehouse</Text>
        <Image source={muttrar} style={{ width: 240, height: 120, marginTop: 30}} />
        <Stock />
        </View>
        </ScrollView>
    );
}

