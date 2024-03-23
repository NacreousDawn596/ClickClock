import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';

const App = () => {
    const [time, setTime] = useState(new Date());
    const [nextTime, setNextTime] = useState(new Date(time.getTime() + 1000));
    const [hourAnim] = useState(new Animated.Value(0));
    const [minuteAnim] = useState(new Animated.Value(0));
    const [secondAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            setNextTime(new Date(time.getTime() + 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    useEffect(() => {
        Animated.timing(hourAnim, {
            toValue: time.getHours() % 12,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(minuteAnim, {
            toValue: time.getMinutes(),
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        Animated.timing(secondAnim, {
            toValue: time.getSeconds(),
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }, [time]);

    const formatTime = (time: any) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    const getPeriod = (hours: any) => {
        return hours >= 12 ? 'PM' : 'AM';
    };

    return (
        <View style={styles.container}>
            <View style={[styles.timeContainer, { zIndex: 2 }]}>
                <View style={styles.time}><Text style={[styles.textt, styles.texts]}>{getPeriod(time.getHours())}</Text></View>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: hourAnim.interpolate({ inputRange: [0, 12], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getHours() % 12)}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: minuteAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getMinutes())}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.texts, { transform: [{ scale: secondAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getSeconds())}</Animated.Text>
            </View>
            <View style={[styles.timeContainer, { zIndex: 1 }]}>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: hourAnim.interpolate({ inputRange: [0, 12], outputRange: [1, 1.2] }) }] }]}>{formatTime(nextTime.getHours() % 12)}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: minuteAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(nextTime.getMinutes())}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.texts, { transform: [{ scale: secondAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(nextTime.getSeconds())}</Animated.Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    timeContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    time: {
        position: "absolute",
        width: "140%",
        height: "100%",
        marginLeft: "50%",
        marginTop: "5%"
    },
    textt: {
        color: "#fff",
    },
    textb: {
        fontSize: 250,
    },
    texts: {
        fontSize: 25,
        fontWeight: "bold"
    }
});

export default App;
