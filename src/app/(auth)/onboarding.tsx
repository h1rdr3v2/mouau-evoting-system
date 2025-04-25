import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const OnboardingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.skipContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                <Image
                    source={require('@/assets/auth/onboard-1.jpg')}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Your Campus Voice Matters</Text>

                <Text style={styles.subtitle}>
                    Shape your campus experience by participating in student elections and initiatives
                </Text>

                <View style={styles.paginationContainer}>
                    <View style={[styles.paginationDot, styles.activeDot]} />
                    <View style={styles.paginationDot} />
                    <View style={styles.paginationDot} />
                </View>
            </View>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('NextScreen')}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    skipContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    skipText: {
        fontSize: 16,
        color: '#333',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#B22222',
    },
    nextButton: {
        backgroundColor: '#051C60',
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 5,
        marginBottom: 30,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingScreen;
