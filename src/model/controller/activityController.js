import axios from 'axios'

import {
    LOAD_ACTIVITIES,
    LOAD_PLANNED_ACTIVITIES,
    LOAD_ACTIVITY_DETAILS,
    LOAD_ACTIVITY_QUESTIONS,
    LOAD_UNIT_QUESIONS,
    LOAD_SITE_QUESTIONS,
    EDITING_START,
    EDITING_END,
    ERROR
} from '../actionTypes'
import { API_URL, ACTIVITY_TYPE, LANG } from '../constants'
import { addDocumentToActivity } from './documentController'

export const loadActivities = (token, companyId, isMaintenance, stationId) =>
    dispatch =>
        axios.get(`${API_URL}/companies/${companyId}/activities`, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                activities = mapActivities(response.data, stationId)
                if (isMaintenance)
                    activities = activities.filter(activity => activity.type === ACTIVITY_TYPE[2])
                dispatch(dispatchLoadActivities(activities))
            })
            .catch(error => {
                console.log(error);
                dispatch(dispatchError(error))
            })


export const loadActivityDetails = (token, activityId, language) =>
    async dispatch => {
        axios.get(`${API_URL}/round-reports/${activityId}`, { headers: { 'Authorization': `token ${token}` } })
            .then(async response => {
                // console.warn('response ' , response)
                activityDetails = mapActivityDetails(response.data, language)

                documentsData = await axios.get(`${API_URL}/round-reports/${activityId}/documents`,
                    { headers: { 'Authorization': `token ${token}` } })

                mappedDocuments = mapDocuments(documentsData.data)
                activityDetails.attachments = mappedDocuments

                dispatch(dispatchLoadActivityDetails(activityDetails))
            })
            .catch(error => {
                console.log(error);
                return error
            })
    }


export const loadPlannedActivities = (token, companyId, stationId) =>
    async dispatch => {
        plannedActivities = []

        locationsData = await axios.get(`${API_URL}/companies/${companyId}/locations`, { headers: { 'Authorization': `token ${token}` } })
        locations = locationsData.data
        locations.map(location => {
            if (location.next_round_date_calc !== null && location.next_round_date_calc !== undefined && location.id == stationId)
                plannedActivities.push({
                    date: location.next_round_date_calc,
                    latest: location.latest_round_date,
                    unit: '',
                    type: ACTIVITY_TYPE[1]
                })
        })

        unitsData = await axios.get(`${API_URL}/companies/${companyId}/units`, { headers: { 'Authorization': `token ${token}` } })
        units = unitsData.data
        units.filter(unit => unit.location.id == stationId).map(unit => {
            if (unit.next_maintenance_calc)
                plannedActivities.push({
                    date: unit.next_maintenance_calc,
                    latest: unit.latest_maintenance,
                    unit: unit.name || '',
                    type: ACTIVITY_TYPE[2]
                })
            if (unit.next_maintenance_oil_calc)
                plannedActivities.push({
                    date: unit.next_maintenance_oil_calc,
                    latest: unit.latest_maintenance_oil,
                    unit: unit.name || '',
                    type: ACTIVITY_TYPE[3]
                })
            if (unit.next_maintenance_gas_calc)
                plannedActivities.push({
                    date: unit.next_maintenance_gas_calc,
                    latest: unit.latest_maintenance_gas,
                    unit: unit.name || '',
                    type: ACTIVITY_TYPE[4]
                })
        })

        plannedActivities.sort((a1, a2) => new Date(a1.latest) > new Date(a2.latest))
        dispatch(dispatchLoadPlannedActivities(plannedActivities))
    }

export const updateActivity = (token, activity) =>
    dispatch => {
        documents = activity.attachments.filter(document => !document.id)
        activity = mapUpdatedActivity(activity)
        console.log("************************ versual inspection ************ activity =>", "activity")
        axios.patch(`${API_URL}/round-reports/${activity.id}/`, activity, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                console.log("************************ versual inspection ************ response =>", 'response')
                documents.map(document => addDocumentToActivity(token, activity.id, document))
            })
            .catch(error => console.log("************************ versual inspection ************ error =>", 'error'))
    }

export const loadActivityQuestions = (token, companyId, language, location) =>
    async dispatch => {
        unitsData = await axios.get(`${API_URL}/companies/${companyId}/units`, { headers: { 'Authorization': `token ${token}` } })
        units = unitsData.data.filter(unit => unit.location.id === location).map(unit => ({
            id: unit.id,
            name: unit.name
        }))

        answers = {}

        await Promise.all(units.map(async unit => {
            unitQuestionsData = await axios.get(`${API_URL}/units/${unit.id}/questions`, { headers: { 'Authorization': `token ${token}` } })
            unitAnswers = unitQuestionsData.data.filter(answer => answer.question.is_visual_inspection).map(answer => ({
                unitId: answer.unit.id,
                unit: answer.unit.name,
                question: answer.question.id,
                type: answer.question.input_type,
                text: language === LANG.EN ? answer.question.text_en : answer.question.text_sv,
                answer: {
                    value_char: null,
                    value_dec: null,
                    value_bool: false,
                    comment: ''
                }
            }))
            answers[unit.name] = unitAnswers
        }))

        dispatch(dispatchLoadActivityQuestions(answers))
    }

export const loadUnitQuestions = (token, unitId, language) =>
    async dispatch => {
        unitQuestionsData = await axios.get(`${API_URL}/units/${unitId}/questions/?question__is_visual_inspection=1`,
            { headers: { 'Authorization': `token ${token}` } })

        unitAnswers = mapQuestions(unitQuestionsData.data, language)
        dispatch(dispatchLoadUnitQuestions(unitId, unitAnswers))
    }

export const loadLocationQuestions = (token, locationId, language) =>
    async dispatch => {
        unitQuestionsData = await axios.get(`${API_URL}/locations/${locationId}/questions/?question__target_type=1`,
            { headers: { 'Authorization': `token ${token}` } })

        locationsAnswers = mapQuestions(unitQuestionsData.data, language)
        dispatch(dispatchLoadLocationQuestions(locationsAnswers))
    }

export const addActivity = (token, activity) =>
    dispatch => {
        let attachments = activity.attachments
        activity = mapNewActivity(activity)

        console.log("************************ versual inspection ************ activity =>", "activity")


        axios.post(`${API_URL}/locations/${activity.location}/round-reports/`, activity, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                setTimeout((response) => {
                    console.log("************************ versual inspection ************ activity =>", response)
                }, 6000);

                id = response.data.id;
                attachments.map(document => {
                    addDocumentToActivity(token, response.data.id, document)
                })
            })
            .catch(error => console.log('api error add activity ', error))
    }

const mapDocuments = documents =>
    documents.map(document => {
        document.type = document.document_type
        delete document.filepath
        delete document.document_type
        return document
    })

const mapQuestions = (unitQuestions, language) =>
    unitQuestions
        .map(answer => ({
            unitId: answer.unit ? answer.unit.id : null,
            unit: answer.unit ? answer.unit.name : null,
            question: answer.question.id,
            type: answer.question.input_type,
            text: language === LANG.EN ? answer.question.text_en : answer.question.text_sv,
            answer: {
                value_char: null,
                value_dec: null,
                value_bool: null,
                comment: ''
            },
            position: answer.question.position
        }))
        .sort((q1, q2) => q1.position == null ? true : q2.position == null ? false : q1.position > q2.position)

const mapNewActivity = activity => {
    answers = []
    for (unit in activity.answers) activity.answers[unit].map(answer =>
        answers.push({
            question: answer.question,
            unit: answer.unitId,
            value_bool: answer.answer.value_bool,
            value_dec: answer.answer.value_dec,
            value_char: answer.answer.value_char,
            comment: answer.answer.comment || ''
        }))

    return {
        report_date: activity.date,
        participants: activity.participants,
        comments: activity.comments,
        answers: answers,
        location: activity.location
    }
}

const mapUpdatedActivity = activity => {
    answers = []
    for (unit in activity.answers) activity.answers[unit].map(answer =>
        answers.push({
            id: answer.id,
            question: answer.question,
            unit: answer.unitId,
            value_bool: answer.answer.value_bool,
            value_dec: answer.answer.value_dec,
            value_char: answer.answer.value_char,
            comment: answer.answer.comment || ''
        }))

    return {
        id: activity.id,
        reporter: activity.reporterId,
        report_date: activity.date,
        participants: activity.participants,
        comments: activity.comments,
        answers: answers
    }
}

const mapActivityDetails = (activity, language) => {
    Array.prototype.groupBy = function (prop) {
        return this.reduce(function (groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }

    return {
        id: activity.id,
        reporterId: activity.reporter.id,
        reporter: `${activity.reporter.first_name} ${activity.reporter.last_name}`,
        date: activity.report_date,
        participants: activity.participants,
        comments: activity.comments,
        answers: activity.answers.filter(answer => answer.unit !== undefined && answer.unit !== null).map(answer => {
            return {
                id: answer.id,
                unitId: answer.unit.id,
                unit: answer.unit.name,
                question: answer.question.id,
                type: answer.question.input_type,
                text: language === LANG.EN ? answer.question.text_en : answer.question.text_sv,
                answer: {
                    value_char: answer.value_char,
                    value_dec: parseFloat(answer.value_dec),
                    // value_dec: Math.round(answer.value_dec),
                    value_bool: answer.value_bool,
                    value_bool_updated: answer.value_bool_updated,
                    comment: answer.comment
                }
            }
        }
        ).groupBy('unit')
    }
}

const mapActivities = (activities, stationId) => {

    if (stationId)
        activities = activities.filter(item => item.location.id == stationId)

    activities = activities.map(item => ({
        id: item.activity_id,
        date: item.date,
        type: ACTIVITY_TYPE[item.activity_type],
        unit: item.unit ? item.unit.name : '',
        site: item.location.name || '',
        stationId: item.location.site_id || '',
        area: item.location.parent.name || '',
        responsible: `${item.responsible.first_name} ${item.responsible.last_name}`,
        participants: item.participants || '',
        comments: item.comments || '',
        status: !!item.status
    }))

    return activities
}


const dispatchLoadActivities = activities => ({
    type: LOAD_ACTIVITIES,
    activities
})

const dispatchLoadPlannedActivities = activities => ({
    type: LOAD_PLANNED_ACTIVITIES,
    activities
})

const dispatchLoadActivityDetails = activityDetails => ({
    type: LOAD_ACTIVITY_DETAILS,
    activityDetails
})

const dispatchLoadActivityQuestions = activityQuestions => ({
    type: LOAD_ACTIVITY_QUESTIONS,
    activityQuestions
})

dispatchLoadUnitQuestions = (unitId, questions) => ({
    type: LOAD_UNIT_QUESIONS,
    unitId,
    questions
})

dispatchLoadLocationQuestions = siteQuestions => ({
    type: LOAD_SITE_QUESTIONS,
    siteQuestions
})

const dispatchError = error => ({
    type: ERROR,
    error
})

export const startEditing = () =>
    dispatch =>
        dispatch({ type: EDITING_START, isEditing: true })

export const endEditing = () =>
    dispatch =>
        dispatch({ type: EDITING_END, isEditing: false })