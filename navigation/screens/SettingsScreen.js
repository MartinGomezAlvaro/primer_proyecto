import * as React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import ParadaCodigo from '../../ParadaCodigo';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ParadaCodigo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });