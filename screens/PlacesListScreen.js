import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import IconF from 'react-native-vector-icons/Fontisto';

import CustomHeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = (props) => {
    const places = useSelector((state) => state.places.places)
    
    useEffect(() => {
        props.navigation.setOptions({
            title: 'All Places',
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title='Add Place'
                            iconName='plus-a'
                            IconComponent={IconF}
                            onPress={() => {
                                props.navigation.navigate('NewPlace')
                            }}
                        />
                    </HeaderButtons>
                );
            },
        });
    });

    const renderItem = (data) => {
        return (
            <PlaceItem 
                title={data.item.title}
                image={data.item.img || null}
                address={data.item.address}
                onSelect={() => {
                    props.navigation.navigate('PlaceDetail', {
                        title: data.item.title,
                        id: data.item.id,
                    });
                }}
            />
        );
    };

    return (
        <FlatList
            data={places}
            renderItem={renderItem}
        />
    );
};

const style = StyleSheet.create({

});

export default PlacesListScreen;