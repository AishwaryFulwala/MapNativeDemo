import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import MapPreview from '../components/MapPreview';

const PlaceDetailScreen = (props) => {
    const id = props.route.params.id
    const places = useSelector((state) => state.places.places.find((place) => place.id =id));
    const loc = { latitude: places.lat, longitude: places.lng };

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params.title,
        });
    });

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {
                places.img ?
                    <Image source={{ uri: places.img }} style={styles.image} />
                :
                    <Text style={styles.txt}>No IMAGE </Text>
            }
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{places.address}</Text>
                </View>
                {
                    Platform.OS === 'ios' ? 
                        <MapPreview
                            style={styles.mapPreview}
                            loc={loc}
                            onPress={() => {
                                props.navigation.navigate('Map', {
                                    readonly: true,
                                    initLoc: loc
                                });
                            }}
                        />
                    :
                        <></>
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    txt: {
        margin: 15,
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default PlaceDetailScreen;