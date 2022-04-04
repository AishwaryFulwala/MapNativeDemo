import RNFS from "react-native-fs";

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, img, loc) => {
    return async (dispatch) => {
        let path = '';

        if (img !== '') {
            const name = img.split('/').pop();
            const extension = Platform.OS === 'android' ? 'file://' : ''
            path = extension + RNFS.DocumentDirectoryPath + name;

            try {
                await RNFS.moveFile(img, path);
            } catch (error) {
                throw error;
            }
        }
        
        dispatch({
            type: ADD_PLACE,
            placeData: {
                title,
                img: path,
                address: 'Dummy',
                lat: loc.latitude,
                lng: loc.longitude,
            },
        });
    };
};