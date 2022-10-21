
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipOrderList from './ShipOrderList';
import ShipSingleOrder from './ShipSingleOrder';

const Stack = createNativeStackNavigator();

export default function Orders(props:any) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={ShipOrderList} />
            <Stack.Screen name="Skicka order">
                {(screenProps) => <ShipSingleOrder {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};