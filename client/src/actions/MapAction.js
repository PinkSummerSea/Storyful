
export const forwardLatLng = (data) => (dispatch) => {
     dispatch({type: 'LAT_LNG_CHANGED', data: data})
}