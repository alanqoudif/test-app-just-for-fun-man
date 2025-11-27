import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppProvider';
import { RootStackParamList } from './src/types/navigation';
import { LocationScreen } from './src/screens/LocationScreen';
import { RestaurantListScreen } from './src/screens/RestaurantListScreen';
import { RestaurantDetailScreen } from './src/screens/RestaurantDetailScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { CartScreen } from './src/screens/CartScreen';
import { OrderStatusScreen } from './src/screens/OrderStatusScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            initialRouteName="Location"
            screenOptions={{
              headerTitleAlign: 'center',
              animation: 'slide_from_right'
            }}
          >
            <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'اختر موقعك' }} />
            <Stack.Screen name="RestaurantList" component={RestaurantListScreen} options={{ title: 'مطاعم قريبة' }} />
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetailScreen} options={{ title: 'تفاصيل المطعم' }} />
            <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'قائمة الطعام' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'العربة' }} />
            <Stack.Screen name="OrderStatus" component={OrderStatusScreen} options={{ title: 'تتبع الطلب' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
