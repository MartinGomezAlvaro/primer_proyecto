import * as React from 'react';
import { View, Text } from 'react-native';
import ParadaNombreScreen from '../../ParadaNombreScreen';

export default function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ParadaNombreScreen/>
        </View>
    );
}