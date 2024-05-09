import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherWidget = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // Obtener el tiempo actual
        fetch('https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=06248c9575d9116d816635bbea1dea38')
            .then(response => response.json())
            .then(data => {
                setWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });

        // Actualizar la fecha y hora cada segundo
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentDate(getFormattedDate(now));
            setCurrentTime(getFormattedTime(now));
        }, 1000);

        const backAction = () => {
            // Evitar que el usuario navegue hacia atrás
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => {
            clearInterval(interval);
            backHandler.remove();
        };
    }, []);

    const getFormattedDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const getFormattedTime = (date) => {
        // Restar una hora a la hora actual para mostrar la hora de Londres
        const londonTime = new Date(date.getTime() - (1 * 60 * 60 * 1000));
        return `${String(londonTime.getHours()).padStart(2, '0')}:${String(londonTime.getMinutes()).padStart(2, '0')}:${String(londonTime.getSeconds()).padStart(2, '0')}`;
    };

    if (!weatherData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const weatherDescriptions = {
        'few clouds': 'Pocas nubes',
        'scattered clouds': 'Nubes dispersas',
        'broken clouds': 'Nubes rotas',
        'overcast clouds': 'Nublado',
        // Añade más traducciones según sea necesario
    };

    const description = weatherDescriptions[weatherData.weather[0].description.toLowerCase()] || weatherData.weather[0].description;

    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase();

    return (
        <LinearGradient style={styles.container}
            colors={["#ffffff", "#006400"]}>
            <View style={styles.widget}>
                <Text style={[styles.dayOfWeek, { fontSize: 20 }]}>
                    {dayOfWeek}
                </Text>
                <View style={styles.separator} />
                <View style={styles.row}>
                    <Text style={styles.currentDate}>{currentDate}</Text>
                    <FontAwesome5 name="calendar-alt" size={20} color="#fff" style={styles.icon} />
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                    <Text style={[styles.currentTime, {alignItems: 'center'}]}>{currentTime}</Text>
                    <FontAwesome5 name="clock" size={20} color="#fff" style={styles.icon} />
                </View>
                <View style={styles.separator} />
            </View>
            <View style={styles.widget}>
                <Text style={styles.title}>LONDRES</Text>
                <View style={styles.separator} />
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <Text style={styles.description}>{description}</Text>
                        <FontAwesome5 name="cloud" size={20} color="#fff" style={styles.icon} />
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.temperature}>{weatherData.main.temp} °C</Text>
                        <FontAwesome5 name="thermometer-half" size={20} color="#fff" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                    <View style={styles.rowItem}>
                        <Text style={styles.info}>{weatherData.wind.speed} m/s</Text>
                        <FontAwesome5 name="wind" size={20} color="#fff" style={styles.icon} />
                    </View>
                    <View style={styles.rowItem}>
                        <Text style={styles.info}>{weatherData.main.humidity}%</Text>
                        <FontAwesome5 name="tint" size={20} color="#fff" style={styles.icon} />
                    </View>
                </View>
                <View style={styles.separator} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center', // Puedes ajustar esto según tus necesidades
        justifyContent: 'center', // Puedes ajustar esto según tus necesidades
      },
    widget: {
        width: '95%',
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    dayOfWeek: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textTransform: 'uppercase', // Agregamos textTransform aquí
    },
    currentDate: {
        color: '#fff',
        fontSize: 18,
    },
    currentTime: {
        color: '#fff',
        fontSize: 18,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        width: '100%',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 5,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    description: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5,
    },
    temperature: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5,
    },
    info: {
        color: '#fff',
        fontSize: 16,
        marginRight: 5,
    },
    icon: {
        marginLeft: 5,
        marginRight: 5,
    },
});

export default WeatherWidget;
