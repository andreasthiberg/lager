import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import muttrar from './assets/muttrar.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.base}>
        <Text style={styles.title}>Infinity Warehouse</Text>
        <Image source={muttrar} style={{ width: 240, height: 120, marginTop: 30}} />
        <Stock />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  },
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