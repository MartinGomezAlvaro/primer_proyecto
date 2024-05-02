import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, TouchableOpacity, Modal, SafeAreaView, Image } from 'react-native';
import Colors from '../constants/colors';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import RutasScreen from './screens/RutasScreen';
import Favoritos from './screens/FavoritosScreen';
import { CuentaScreen } from './screens/CuentaScreen';
import WelcomeScreen from './screens/WelcomeScreen';


//Screen names
const homeName = "Home";
const detailsName = "Paradas";
const settingsName = "Llegadas";
const rutasName = "Rutas";
const favoritosName = "Favoritos"
const CuentaName = "Cuenta"
const WelcomeName = "Welcome"

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ProfileScreenWithDrawer = () => {

  const {clearData} = useContext(UserContext);

  return (
    <Drawer.Navigator
    initialRouteName={homeName}
    drawerContent={props => {
      const {routeNames, index} = props.state;
      const focused = routeNames[index];

      return (
        <>
        <SafeAreaView>
            <View
              style={{
                height: 300,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.ORANGE,
              }}
            >
              <Image
                source={require('../images/BussAPI.jpg')}
              />
            </View>
          </SafeAreaView>
          <DrawerContentScrollView {...props}>
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
          <View style={styles.separator} />
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
          <View style={styles.separator} />
          <View>
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
        </DrawerContentScrollView>
        <DrawerItem style={styles.bottomDrawerSection} label={'Salir'} onPress={() => {
            props.navigation.navigate(WelcomeName),
            clearData()
          }}
          focused={focused === WelcomeName}
                  activeBackgroundColor={Colors.ORANGE}
                  inactiveBackgroundColor={Colors.GRAY_LIGHT}
                  inactiveTintColor={Colors.BLACK}
                  activeTintColor={Colors.WHITE}
                  icon={({ color, size }) => (
                    <Ionicons name="exit" color={color} size={size} />
                  )}
          />
        </>
      );
    }}>
      <Drawer.Screen name={homeName} component={HomeScreen} />
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
          activeTintColor: '#006400',
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    width: '100%',
    marginVertical: 5,
  },
});