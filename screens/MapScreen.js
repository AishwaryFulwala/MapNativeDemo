import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import CustomHeaderButton from '../components/HeaderButton';

const MapScreen = (props) => {
    const initLoc = props.route.params ? props.route.params.initLoc : null;
    const readonly = props.route.params ? props.route.params.readonly : '';

    const [selectedLocation, setSelectedLocation] = useState({
        latitude: initLoc ? initLoc.latitude : 37.78,
        longitude: initLoc ? initLoc.longitude : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const saveHandler = () => {
        if(!selectedLocation)
            return;

        props.navigation.navigate('NewPlace', {
            loc: selectedLocation,
        })
    };

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Map',
        });
    });

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                if(readonly) 
                    return;
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Save'
                            iconName='save'
                            IconComponent={IconF}
                            onPress={saveHandler}
                        />
                    </HeaderButtons>
                );
            }, 
        });
    }, [selectedLocation]);

    const selectLocationHandler = event => {
        if(readonly)
            return

        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <MapView
            style={styles.map}
            region={selectedLocation}
            onPress={selectLocationHandler}
        >
        {selectedLocation && (
            <Marker title="Picked Location" coordinate={selectedLocation} />
        )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1,
    }
});

export default MapScreen;