import Place from "../models/place";
import { ADD_PLACE } from "./places-actions";

const initState = {
    places: [],
};

const PlacesReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                new Date().toString(),
                action.placeData.title,
                action.placeData.img,
                action.placeData.address,
                action.placeData.lat,
                action.placeData.lng
            );

            return {
                places: state.places.concat(newPlace),
            }
    
        default:
            return state;
    }    
};

export default PlacesReducer;