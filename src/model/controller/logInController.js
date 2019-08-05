import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage"
import RNLocation from 'react-native-location'
// import Permissions from 'react-native-permissions'
import { PermissionsAndroid, Platform } from 'react-native';

import { LOG_IN, LOG_OUT, ERROR, LOAD_TOKEN, LOAD_COMPANY_ID, LOAD_LOCATIONS, LOAD_UNITS, LOAD_USER_ID, LOAD_CHILD_LOCATIONS, LOAD_DEFAULT_SUBSTATION, CHANGE_LANGUAGE } from '../actionTypes'
import { API_URL, LANG } from '../constants'

export const logOut = () =>
    async dispatch => {
        await AsyncStorage.removeItem('token')
        dispatch({ type: LOG_OUT })
    }

export const logIn = (username, password) =>

    async dispatch => {
        await axios.post(API_URL + '/api-token-auth/', { username: username, password: password })
            .then(async response => {
                console.log(JSON.stringify(response));
                dispatch(dispatchLogIn(response.data.token))
                await AsyncStorage.setItem('token', response.data.token)
                await initState(dispatch, response.data.token)
            }).catch(error => dispatch(dispatchError(error)))
    }


export const loadToken = () =>
    async dispatch => {
        data = await AsyncStorage.getItem('token')
        dispatch(dispatchLoadToken(data))
        await initState(dispatch, data)
    }

const initState = async (dispatch, token) => {
    response = await axios.get(API_URL + '/my/profile/', { headers: { 'Authorization': `token ${token}` } })
    dispatch(dispatchUserId(response.data.id))

    response = await axios.get(API_URL + '/my/company/', { headers: { 'Authorization': `token ${token}` } })
    companyId = response.data.id
    dispatch(dispatchCompanyId(response.data.id))

    childLocations = []

    response = await axios.get(API_URL + '/companies/' + companyId + '/units/', { headers: { 'Authorization': `token ${token}` } })
    units = mapUnits(response.data)
    dispatch(dispatchUnits(units))


    response = await axios.get(API_URL + '/companies/' + companyId + '/locations/', { headers: { 'Authorization': `token ${token}` } })
    locations = mapItems(response.data)
    dispatch(dispatchLocations(locations))
    childLocations = mapChildLocations(response.data)
    console.log("childLocations: ", childLocations);
    dispatch(dispatchChildLocations(childLocations))

    storedLanguage = await AsyncStorage.getItem('language')
    language = storedLanguage || LANG.EN
    dispatch(dispatchChangeLanguage(language))


    loadStationFromStorage = async () => {
        data = await AsyncStorage.getItem('substationId')
        if (data !== undefined)
            dispatch(dispatchDefaultSubstation(parseInt(data)))
    }

    granted = false;
    if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!granted)
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Cool Photo App Location Permission',
                        message:
                            'Cool Photo App needs access to GPS ' +
                            'so you can take your current location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn('You can use GPS');
                } else {
                    console.warn('Gps permission denied');
                }
            } catch (err) {
                console.warn(err);
            }
    }
    position = await getPosition();
    if (granted == true && position !== undefined) {
        latitude = position.coords.altitude
        longitude = position.coords.longitude

        nearestStation = childLocations[0]
        for (station of childLocations) {
            nearestDist = Math.sqrt(Math.pow(latitude - nearestStation.gps_coord_lat, 2) + Math.pow(longitude - nearestStation.gps_coord_long, 2))
            currentDist = Math.sqrt(Math.pow(latitude - station.gps_coord_lat, 2) + Math.pow(longitude - station.gps_coord_long, 2))
            if (currentDist < nearestDist)
                nearestStation = station
        }
        // console.warn("nearestStation: ", nearestStation);
        AsyncStorage.setItem('substationId', nearestStation.id + '')
        dispatch(dispatchDefaultSubstation(nearestStation.id))
    }



    // if (granted == true && result !== undefined) {
    //     latitude = result.coords.latitude
    //     longitude = result.coords.longitude

    //     nearestStation = childLocations[0]
    //     for (location of childLocations) {
    //         nearestDist = Math.sqrt(Math.pow(latitude - nearestStation.gps_coord_lat, 2) + Math.pow(longitude - nearestStation.gps_coord_long, 2))
    //         currentDist = Math.sqrt(Math.pow(latitude - location.gps_coord_lat, 2) + Math.pow(longitude - location.gps_coord_long, 2))
    //         if (currentDist < nearestDist)
    //             nearestStation = location
    //     }

    //     AsyncStorage.setItem('substationId', nearestStation.id + '')
    //     dispatch(dispatchDefaultSubstation(nearestStation.id))
    // }
}
var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}
const mapUnits = items =>
    items.filter(item => item.location).map(item => ({
        id: item.id,
        name: item.name,
        locationId: item.location.id
    }))

const mapItems = items =>
    items.map(item => ({
        id: item.id,
        name: item.name
    }))

const mapChildLocations = locations =>
    locations.filter(location => location.children === undefined || location.children === null || location.children.length === 0).map(location => ({
        id: location.id,
        name: location.name,
        gps_coord_lat: parseFloat(location.gps_coord_lat),
        gps_coord_long: parseFloat(location.gps_coord_long)
    }))

const dispatchLogIn = token => ({
    type: LOG_IN,
    token
})

const dispatchLoadToken = token => ({
    type: LOAD_TOKEN,
    token
})

const dispatchUserId = userId => ({
    type: LOAD_USER_ID,
    userId
})

const dispatchCompanyId = companyId => ({
    type: LOAD_COMPANY_ID,
    companyId
})

const dispatchLocations = locations => ({
    type: LOAD_LOCATIONS,
    locations
})

const dispatchChildLocations = childLocations => ({
    type: LOAD_CHILD_LOCATIONS,
    childLocations
})

const dispatchUnits = units => ({
    type: LOAD_UNITS,
    units
})

const dispatchDefaultSubstation = defaultSubstationId => ({
    type: LOAD_DEFAULT_SUBSTATION,
    defaultSubstationId
})

const dispatchError = error => ({
    type: ERROR,
    error
})

const dispatchChangeLanguage = language => ({
    type: CHANGE_LANGUAGE,
    language
})