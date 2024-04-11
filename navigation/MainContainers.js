import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Colors from '../constants/colors';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import RutasScreen from './screens/RutasScreen';
import DrawerExample from '../Drawer';
import Timer from './screens/Timer';
import Favoritos from './screens/FavoritosScreen';
import { CuentaScreen } from './screens/CuentaScreen';


//Screen names
const homeName = "Home";
const detailsName = "Paradas";
const settingsName = "LLegadas";
const rutasName = "Rutas";
const timerName = "Timer"
const favoritosName = "Favoritos"
const CuentaName = "Cuenta"

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ProfileScreenWithDrawer = () => {
  return (
    <Drawer.Navigator
    initialRouteName={homeName}
    drawerContent={props => {
      const {routeNames, index} = props.state;
      const focused = routeNames[index];

      return (
        <>
          <DrawerContentScrollView {...props}>
          <Text>Hello</Text>
          <DrawerItem label={'Home'} onPress={() => {
            props.navigation.navigate(homeName)
          }}
          focused={focused === homeName}
                activeBackgroundColor={Colors.ORANGE}
                inactiveBackgroundColor={Colors.GRAY_LIGHT}
                inactiveTintColor={Colors.BLACK}
                activeTintColor={Colors.WHITE}
                icon={({ color, size }) => (
                  <Ionicons name="home-outline" color={color} size={size} />
                )}
          />
          <DrawerItem label={'Timer'} onPress={() => {
            props.navigation.navigate(timerName)
          }}
          focused={focused === timerName}
                  activeBackgroundColor={Colors.ORANGE}
                  inactiveBackgroundColor={Colors.GRAY_LIGHT}
                  inactiveTintColor={Colors.BLACK}
                  activeTintColor={Colors.WHITE}
          />
          <DrawerItem label={'Favoritos'} onPress={() => {
            props.navigation.navigate(favoritosName)
          }}
          focused={focused === favoritosName}
                  activeBackgroundColor={Colors.ORANGE}
                  inactiveBackgroundColor={Colors.GRAY_LIGHT}
                  inactiveTintColor={Colors.BLACK}
                  activeTintColor={Colors.WHITE}
                  icon={({ color, size }) => (
                    <Ionicons name="star-outline" color={color} size={size} />
                  )}
          />
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem 
            label={'Cuenta'} 
            onPress={() => props.navigation.navigate(CuentaName)}
            focused={focused === CuentaName}
            activeBackgroundColor={Colors.ORANGE}
            inactiveBackgroundColor={Colors.GRAY_LIGHT}
            inactiveTintColor={Colors.BLACK}
            activeTintColor={Colors.WHITE}
            icon={({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            )}
          />
        </View>
        </>
        
      );
    }}>
      <Drawer.Screen name={homeName} component={DrawerExample} />
      <Drawer.Screen name={timerName} component={Timer} />
      <Drawer.Screen name={favoritosName} component={Favoritos} />
      <Drawer.Screen name={CuentaName} component={CuentaScreen} />
    </Drawer.Navigator>
  );
};

function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'location' : 'location-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'time' : 'time-outline';
            } else if (rn === rutasName) {
              iconName = focused ? 'bus' : 'bus-outline';
            } 
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'black',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={ProfileScreenWithDrawer} options={{headerShown: false}} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={rutasName} component={RutasScreen} />
      </Tab.Navigator>
    
  );
}

export default MainContainer;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});