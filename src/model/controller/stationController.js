import axios from 'axios'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import { LOAD_STATIONS, LOAD_STATIONS_GRAPH, LOAD_DEFAULT_SUBSTATION, ERROR } from '../actionTypes'
import { API_URL, DOCUMENT_TYPES } from '../constants'


export const loadStations = (token, companyId) =>
    async dispatch => {
        await axios.get(`${API_URL}/companies/${companyId}/locations`, { headers: { 'Authorization': `token ${token}` } })
            .then(async response => {
                stations = mapStations(response.data)
                // alert(JSON.stringify(stations));
                extendedStations = await Promise.all(stations.map(async station => {
                    let stationData = await axios.get(`${API_URL}/locations/${station.id}`, { headers: { 'Authorization': `token ${token}` } })
                    let extendedStation = stationData.data

                    let contacts = extendedStation.contacts
                    if (contacts)
                        contacts = mapContacts(extendedStation.contacts)
                    else
                        contacts = []

                    let documentsData = await axios.get(`${API_URL}/locations/${station.id}/documents`, { headers: { 'Authorization': `token ${token}` } })
                    let documents = documentsData.data
                    documents = mapDocuments(documents)

                    let componentsData = await axios.get(`${API_URL}/locations/${station.id}/components`, { headers: { 'Authorization': `token ${token}` } })
                    let components = componentsData.data
                    components = mapComponents(components)
                    
                    
                    return {
                        ...station,
                        systemVoltage1: extendedStation.volt1,
                        systemVoltage2: extendedStation.volt2,
                        systemVoltage3: extendedStation.volt3,
                        other: extendedStation.misc ? extendedStation.misc.replace(/(<([^>]+)>)/ig, "") : '',
                        address: extendedStation.address_visit,
                        contact: contacts,
                        documents: documents,
                        components: components
                    }
                    
                }))



                graphArray = createGraphStationsArray(response.data)
                mainStation = graphArray.find(station => station.isMain === true)
                graph = createGraph(mainStation, graphArray)

                dispatch(dispatchLoadStationsGraph(graph))
                dispatch(dispatchLoadStations(extendedStations))
            })
            .catch(error => { console.log('load stations error ', error); dispatch(dispatchError(error)) })
    }

const createGraphStationsArray = stations =>
    stations.map(station => ({
        id: station.id,
        name: station.name,
        isMain: (station.parent === null),
        children: station.children.map(child => child.id)
    }))

const createGraph = (parent, arr) => {
    if (parent.children.length > 0)
        return {
            name: parent.name,
            id: parent.id,
            children: parent.children.map(childId => {
                child = arr.find(station => station.id === childId)
                return createGraph(child, arr)
            })
        }
    else
        return {
            name: parent.name,
            id: parent.id,
        }
}

const mapStations = stations =>
    stations.filter(station => station.children === undefined || station.children.length === 0).map(station => ({
        id: station.id,
        name: station.name,
        stationId: station.site_id,
        area: station.parent.name,
        city: station.city,
        qr: station.qr,
    }))

const mapContacts = contacts =>
    contacts.map(contact => ({
        id: contact.id,
        name: contact.name,
        description: contact.description,
        email: contact.email
    }))

const mapComponents = components =>
    components.map(component => ({
        id: component.id,
        name: component.name || '',
        manufacturingNumber: component.manufacturing_number || '',
        unit: component.unit.name || '',
        status: !!component.status
    }))

const mapDocuments = documents =>
    documents.map(document => ({
        name: document.name,
        type: document.type,
        language: document.language,
        description: document.description
    }))

const dispatchLoadStations = stations => ({
    type: LOAD_STATIONS,
    stations
})

const dispatchLoadStationsGraph = stationsGraph => ({
    type: LOAD_STATIONS_GRAPH,
    stationsGraph
})

export const changeDefaultSubstation = (defaultSubstationId) =>
    dispatch => {
        AsyncStorage.setItem('substationId', defaultSubstationId+'')
        dispatch(dispatchDefaultSubstation(defaultSubstationId))
    }

const dispatchDefaultSubstation = defaultSubstationId => ({
    type: LOAD_DEFAULT_SUBSTATION,
    defaultSubstationId
})

const dispatchError = error => ({
    type: ERROR,
    error
})