import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {
    const [ titleValue, setTitleValue ] = useState('');
    const [ img, setImg ] = useState('');
    const [ loc, setLoc ] = useState('');

    const dispatch = useDispatch();

    const titleChnageHandler = (text) => {
        setTitleValue(text);
    }

    const imgTakenHandler = (path) => {
        setImg(path);
    };

    const locPickHandler = (loc) => {
        setLoc(loc)
    };

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue, img, loc));
        props.navigation.dispatch(CommonActions.goBack())
    }

    useEffect(() => {
        props.navigation.setOptions({
            title: 'Add Place',
        });
    });

    return (
        <ScrollView>
            <View style={style.form}>
                <Text style={style.label}>Title</Text>
                <TextInput
                    style={style.textInput}
                    onChangeText={titleChnageHandler}
                    value={titleValue}
                />
                <ImagePicker 
                    onImageTaken={imgTakenHandler}
                />
                <LocationPicker
                    navigation={props.navigation}
                    loc={props.route.params ? props.route.params.loc : ''}
                    onLocPick={locPickHandler}
                />
                <Button 
                    title='Save Place'
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
});

export default NewPlaceScreen;