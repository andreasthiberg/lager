import { Text, View, ScrollView, StyleSheet, Image } from 'react-native';
import muttrar from '../assets/muttrar.jpg';
import Stock from '../components/Stock';

export default function Home() {
    return (
        <ScrollView>
        <View style={styles.base}>
        <Text style={styles.title}>Infinity Warehouse</Text>
        <Image source={muttrar} style={{ width: 240, height: 120, marginTop: 30}} />
        <Stock />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    base: {
      alignItems: "center",
      display: 'flex',
      backgroundColor: '#f2f9fa',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 40
    },
    title: {
      color: '#000',
      fontSize: 30
    },
    subtitle: {
      color: "#000",
      fontSize: 24
    }
  });