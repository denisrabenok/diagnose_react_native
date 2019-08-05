import axios from 'axios'

import { LOAD_LOGS, ERROR } from '../actionTypes'
import { API_URL, LANG } from '../constants'
import { addDocument, loadDocument } from './documentController'

export const loadLogs = (token, companyId, language) =>
    async dispatch => {
        
        // await axios.get(`${API_URL}/logs`, { headers: { 'Authorization': `token ${token}` } })
        // .then(async response => {

        //     hashMapLogs = hashMapAllLogs(response.data)

            await axios.get(`${API_URL}/companies/${companyId}/logs`, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                logs = mapLogs(response.data, language)
                // loadDocument(token, logs[logs.length - 2].attachments[0])
                dispatch(dispatchLoadLogs(logs))
            })
            .catch(error => { console.log(error); dispatch(dispatchError(error))})
        // })
        // .catch(error => { console.log(error); dispatch(dispatchError(error))})
    }

export const addLog = (token, log) =>
    dispatch => {
        let attachments = log.attachments

        log = mapNewLog(log)
        axios.post(`${API_URL}/logs/`, log, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                let id = response.data.id
                let docIds = []
                attachments.map(document => { addDocument(token, id, document).then(id => docIds.push(id)) })
                log.id = id
                log.attachments = docIds
                axios.patch(`${API_URL}/logs/${id}/`, log, { headers: { 'Authorization': `token ${token}` } })
            })
            .catch(error => console.log(error.message))
    }

const mapNewLog = log => ({
    event: log.eventId,
    location: log.locationId,
    unit: log.unitId,
    author: log.responsibleId,
    payload: log.comment
    // attachments ??????
})

const mapLogs = (logs, language) =>
    logs.map(item => ({
        id: item.id,
        date: item.creation_date.slice(0, 10),
        responsible: `${item.author.first_name} ${item.author.last_name}`,
        event: item.event ? language === LANG.EN ? item.event.name_en : item.event.name_sv : '',
        comment: item.payload || '',
        attachments: item.attachments
    }))

// const hashMapAllLogs = (logs) => {
//     logs.map(item => ({
//         id: item.id,
//         location: item.root_location.children.id,
//         unit: item.unit
//     }))

//     const hashMap = {}

//     for(const item of logs){
//         hashMap[item.id] = item
//     }

//     return hashMap
// }

const dispatchLoadLogs = logs => ({
    type: LOAD_LOGS,
    logs
})

const dispatchError = error => ({
    type: ERROR,
    error
})