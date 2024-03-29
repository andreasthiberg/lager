import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Invoices from "./components/Invoices";
import ShipOrders from "./components/ShipOrders";
import Auth from "./components/auth/Auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();
const routeIcons : any = {
  "Lager": "home",
  "Plock": "list",
  "Inleveranser": "cube",
  "Logga in": "log-in",
  "Fakturor": "clipboard",
  "Leveranser": "send"
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    async () => {
    setIsLoggedIn(await authModel.loggedIn());
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route['name']] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Plock">
            {() => <Pick products={products} setProducts={setProducts} />}
        </Tab.Screen>
        <Tab.Screen name="Inleveranser">
            {() => <Deliveries products={products} setProducts={setProducts} />}
        </Tab.Screen>
        {isLoggedIn ?
        <Tab.Screen name="Fakturor" component={Invoices} /> :
        <Tab.Screen name="Logga in">
          {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        }
        <Tab.Screen name="Leveranser" component={ShipOrders} />
      </Tab.Navigator>
      </NavigationContainer>
    <StatusBar style="auto" />
    <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});