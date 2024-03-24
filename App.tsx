import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Easing, StatusBar, PanResponder, Dimensions } from 'react-native';

const App = () => {
    StatusBar.setHidden(true, 'none');
    const [time, setTime] = useState(new Date());
    const [nextTime, setNextTime] = useState(new Date(time.getTime() + 1000));
    const [hourAnim] = useState(new Animated.Value(0));
    const [minuteAnim] = useState(new Animated.Value(0));
    const [secondAnim] = useState(new Animated.Value(0));
    const [colorIndex, setColorIndex] = useState(0);
    const colors = [
        ["rgb(240, 248, 255)", "rgb(0, 0, 0)", 'rgba(0, 0, 0, 0.6)'],
        ["rgb(240, 248, 255)", "rgb(255, 192, 203)", 'rgba(255, 192, 203, 0.6)'],
        ['rgb(240, 248, 255)', 'rgb(255, 0, 0)', 'rgba(255, 0, 0, 0.6)'],
        ['rgb(240, 248, 255)', 'rgb(0, 0, 255)', 'rgba(0, 0, 255, 0.6)'],
        ['rgb(240, 248, 255)', 'rgb(128, 0, 128)', 'rgba(128, 0, 128, 0.6)'],
        ["rgb(0, 0, 0)", "rgb(240, 248, 255)", 'rgba(240, 248, 255, 0.6)'],
    ]

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

    const screenHeight = Dimensions.get('window').height;
    const swipeThreshold = 4 * screenHeight / 9;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy < -swipeThreshold) {
                setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
                styles = StyleSheet.create({
                    ...styles,
                    container: {
                        ...styles.container,
                        backgroundColor: colors[colorIndex][0]
                    },
                    textb: {
                        ...styles.textb,
                        textShadowColor: colors[colorIndex][2],
                    },
                    textt: {
                        ...styles.textt,
                        color: colors[colorIndex][1],
                    }
                });
            }
        }
    });


    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <View style={[styles.timeContainer, { zIndex: 2 }]}>
                <View style={styles.time}><Text style={[styles.textt, styles.texts]}>{getPeriod(time.getHours())}</Text></View>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: hourAnim.interpolate({ inputRange: [0, 12], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getHours() % 12)}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.textb, { transform: [{ scale: minuteAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getMinutes())}</Animated.Text>
                <Animated.Text style={[styles.textt, styles.texts, { transform: [{ scale: secondAnim.interpolate({ inputRange: [0, 60], outputRange: [1, 1.2] }) }] }]}>{formatTime(time.getSeconds())}</Animated.Text>
            </View>
        </View>
    );
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(0, 0, 0)",
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
        width: "200%",
        height: "100%",
        marginLeft: "50%",
        marginTop: "5%"
    },
    textt: {
        color: "rgb(240, 248, 255)",
    },
    textb: {
        fontSize: 250,
        textShadowColor: 'rgba(240, 248, 255, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
        borderRadius: 20,
        overflow: "hidden",
    },
    texts: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default App;
