import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert,Platform } from 'react-native';

import { PERMISSIONS, request } from 'react-native-permissions';
import { launchCamera } from 'react-native-image-picker';

import Colors from '../constants/Colors';

const ImagePicker = (props) => {
    const [ pickImg, setPickImg ] = useState('');

    const verifyPermission = async () => {
        let res;
        if (Platform.OS === 'ios')
            res = await request(PERMISSIONS.IOS.CAMERA); 
        else
            res = await request(PERMISSIONS.ANDROID.CAMERA);

        if (res !== 'granted') {
            Alert.alert('Insufficient Permission', 'You need to grant camera permission', [{text: 'okay'}])
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = verifyPermission()
        
        if(!hasPermission)
            return;

        let img;
        try {
            img = await launchCamera();
        } catch (error) {
            Alert.alert('', 'Can\'t access Camera', [{text: okay}])
            return;
        }
        
        if(img.assets === undefined)
            return;

        setPickImg(img.assets[0].uri);
        props.onImageTaken(img.assets[0].uri);
    };

    return (
        <View style={styles.imgPick}>
            <View style={styles.imgView}>
                {
                    pickImg ?
                        <Image style={styles.img} source={{uri: pickImg}} />
                    :
                        <Text>No IMAGE picked yet.</Text>
                }
            </View>
            <Button 
                title='Take Image'
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imgPick: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imgView: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cccccc',
        borderWidth: 1,
    },
    img: {
        width: '100%',
        height: '100%',
    },
});

export default ImagePicker;