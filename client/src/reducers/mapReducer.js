const mapReducer = (state = {lat: null, lng: null}, action) => {
    switch(action.type){
        case "LAT_LNG_CHANGED":
            return {lat: action.data.lat, lng: action.data.lng}
        default:
            return state
    }
}

export default mapReducer