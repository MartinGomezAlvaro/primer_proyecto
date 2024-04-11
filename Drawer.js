import React from 'react';
import { View, Text, Button, StyleSheet, DrawerLayoutAndroid } from 'react-native';

const DrawerExample = () => {
  const drawerRef = React.useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const closeDrawer = () => {
    drawerRef.current.closeDrawer();
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <Text style={styles.drawerItem}>Drawer Item 1</Text>
          <Text style={styles.drawerItem}>Drawer Item 2</Text>
          <Text style={styles.drawerItem}>Drawer Item 3</Text>
          <Button title="Cerrar Drawer" onPress={closeDrawer} />
        </View>
      )}
    >
      <Button title="Abrir Drawer" onPress={openDrawer} />
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DrawerExample;
