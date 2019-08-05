import axios from 'axios'

import { LOAD_MAINTENANCE_QUESTIONS, LOAD_ACTIVITY_DETAILS, ERROR } from '../actionTypes'
import { API_URL, ACTIVITY_TYPE, LANG } from '../constants'
import { addDocumentToMaintenance } from './documentController'


export const loadMaintenanceQuestions = (token, unitId, language) =>
    async dispatch => {
        await axios.get(`${API_URL}/units/${unitId}/questions/?question__is_maintenance=1`, { headers: { 'Authorization': `token ${token}` } })
            .then(async response => {
                console.log("api++++++++++++++++++++++++++++++++++++++++++",response.data)
                questions = response.data
                questions = mapQuestions(questions, language)
                dispatch(dispatchLoadMaintenanceQuestions(questions))
            })
            .catch(error => { console.log(error); dispatch(dispatchError(error)) })
    }

export const addMaintenance = (token, maintenance) =>
    dispatch => {
        let documents = maintenance.documents
        console.log("************** Mantainnace ********** maintenance =>", maintenance)

        maintenance1 = mapNewMaintenance(maintenance)

        console.log("************** Mantainnace ********** paasing params =>", maintenance1)

        axios.post(`${API_URL}/units/${maintenance1.unit}/maintenance-reports/`, maintenance1, { headers: { 'Authorization': `token ${token}` } })
            .then( response => {
                //add documents
                setTimeout((response) => {
               console.log("************** Mantainnace ********** response maintenance =>", response)
                    
                }, 2000);
                id = response.data.id;
                maintenance.attachments.map(document => {
                    addDocumentToMaintenance(token, response.data.id, document)
                })

            })
            .catch(error => console.log("************** Mantainnace ********** error =>", 'error'))
    }

export const loadMaintenanceDetails = (token, maintenance, language) =>
    async dispatch => {
        await axios.get(`${API_URL}/maintenance-reports/${maintenance.id}`, { headers: { 'Authorization': `token ${token}` } })
            .then(async response => {
                maintenanceDetails = mapMaintenanceDetails(response.data, language)

                documentsData = await axios.get(`${API_URL}/maintenance-reports/${maintenance.id}/documents`,
                    { headers: { 'Authorization': `token ${token}` } })
                mappedDocuments = mapDocuments(documentsData.data)
                maintenanceDetails.attachments = mappedDocuments

                dispatch(dispatchLoadActivityDetails(maintenanceDetails))
            })
            .catch(error => { console.log(error); dispatch(dispatchLoadActivityDetails(maintenance)) })
    }

export const updateMaintenance = (token, maintenance) =>
    dispatch => {
        maintenance = mapUpdatedMaintenance(maintenance)
        axios.patch(`${API_URL}/maintenance-reports/${maintenance.id}/`, maintenance, { headers: { 'Authorization': `token ${token}` } })
            .then(response => { })
            .catch(error => console.log(error))
    }

const mapMaintenanceDetails = (activity, language) => ({
    id: activity.id,
    reporterId: activity.reporter.id,
    reporter: `${activity.reporter.first_name} ${activity.reporter.last_name}`,
    date: activity.report_date,
    type: ACTIVITY_TYPE[2],
    gasSamples: activity.gas_sample_taken,
    oilSamples: activity.oil_sample_taken,
    participants: activity.participants,
    comments: activity.comments,
    answers: {
        'Protocol': activity.answers.map(answer => ({
            id: answer.id,
            question: answer.question.id,
            type: answer.question.input_type,
            text: language === LANG.EN ? answer.question.text_en : answer.question.text_sv,
            answer: {
                value_char: answer.value_char,
                value_dec: Math.round(answer.value_dec),
                value_bool: answer.value_bool,
                value_bool_updated: answer.value_bool_updated,
                comment: answer.comment
            }
        }))
    }
})

const mapNewMaintenance = maintenance => ({
    unit: maintenance.unitId,
    report_date: maintenance.date,
    participants: maintenance.participants,
    comments: maintenance.comments,
    gas_sample_taken: maintenance.gasSamples,
    oil_sample_taken: maintenance.oilSamples,
    answers: maintenance.answers,
    reporter: maintenance.reporterId
})

const mapUpdatedMaintenance = maintenance => ({
    id: maintenance.id,
    unit: maintenance.unitId,
    report_date: maintenance.date,
    participants: maintenance.participants,
    comments: maintenance.comments,
    gas_sample_taken: maintenance.gasSamples,
    oil_sample_taken: maintenance.oilSamples,
    answers: maintenance.answers.Protocol,
    reporter: maintenance.reporterId
})

const mapDocuments = documents =>
    documents.map(document => {
        document.type = document.document_type
        delete document.filepath
        delete document.document_type
        return document
    })

const mapQuestions = (questions, language) =>
    mappedQuestions = questions
        .map(question => ({
            id: question.question.id,
            text: language === LANG.EN ? question.question.text_en : question.question.text_sv,
            type: question.question.input_type,
            position: question.question.position
        }))
        .sort((q1, q2) => q1.position == null ? true : q2.position == null ? false : q1.position > q2.position)

const dispatchLoadMaintenanceQuestions = maintenanceQuestions => ({
    type: LOAD_MAINTENANCE_QUESTIONS,
    maintenanceQuestions
})

const dispatchLoadActivityDetails = activityDetails => ({
    type: LOAD_ACTIVITY_DETAILS,
    activityDetails
})

const dispatchError = error => ({
    type: ERROR,
    error
})