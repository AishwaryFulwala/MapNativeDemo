import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapPreview = (props) => {
    const region = {
        latitude: props.loc.latitude,
        longitude: props.loc.longitude,
        latitudeDelta: props.loc.latitudeDelta ||  0.0922,
        longitudeDelta: props.loc.longitudeDelta || 0.0421,
    };

    return (
        <View style={styles.mapView}>
            {
                props.loc ? 
                    <MapView
                        style={styles.img}
                        region={region}
                        onPress={props.onPress}
                    >
                        <Marker title="Picked Location" coordinate={region} />
                    </MapView>
                :
                    props.children
            } 
        </View>
    );
};

const styles = StyleSheet.create({
    mapView: {
        marginBottom:10,
        width: '100%',
        height: 150,
        borderColor: '#cccccc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
    }
});

export default MapPreview;