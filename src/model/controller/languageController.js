import { CHANGE_LANGUAGE } from '../actionTypes'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export const changeLanguage = (language) =>
    dispatch => {
        AsyncStorage.setItem('language', language)
        dispatch(dispatchChangeLanguage(language))
    }
        

const dispatchChangeLanguage = language => ({
    type: CHANGE_LANGUAGE,
    language
})