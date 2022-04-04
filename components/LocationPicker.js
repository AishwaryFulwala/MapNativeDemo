import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';

import { PERMISSIONS, request } from 'react-native-permissions';
import Location from 'react-native-geolocation-service'

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [ pickLoc, setPickLoc ] = useState('');
    const [ isFetch, setIsFetch ] = useState(true);

    useEffect(() => {
        if(props.loc)
            setPickLoc(props.loc)
            props.onLocPick(props.loc);
    }, [ props.loc ]);

    const verifyPermission = async () => {
        const res = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_ALWAYS : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION)

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant Location permission', [{text: 'okay'}])
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission()
       
        if(!hasPermission)
            return;

        Location.getCurrentPosition(
            (position) => {
                setPickLoc({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta:  0.0922,
                    longitudeDelta: 0.0421,
                });

                props.onLocPick({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            },
            (error) => {
                Alert.alert('', 'Can\'t access Location', [{text: 'okay'}])
                return;
            },
            { timeout: 15000 }
        );
        setIsFetch(false);
    };

    const pickMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locPick}>
            <MapPreview loc={pickLoc} onPress={pickMapHandler}>
                {
                    isFetch ?
                        <ActivityIndicator size='large' color={Colors.primary} />
                    :
                        <Text>No LOCATION chosen yet.</Text>
                }
            </MapPreview>
            <View style={styles.btn}>
                <Button
                    title='Get User Location'
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Pick on Map'
                    color={Colors.primary}
                    onPress={pickMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locPick: {
        marginBottom: 15,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default LocationPicker; 