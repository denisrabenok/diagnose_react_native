import {
    CHANGE_LANGUAGE,
    LOG_IN, LOG_OUT, LOAD_TOKEN, LOAD_USER_ID, LOAD_COMPANY_ID, LOAD_LOCATIONS, LOAD_CHILD_LOCATIONS, LOAD_UNITS,
    LOAD_ACTIVITIES, LOAD_PLANNED_ACTIVITIES, LOAD_ACTIVITY_DETAILS, LOAD_ACTIVITY_QUESTIONS, LOAD_UNIT_QUESIONS, LOAD_SITE_QUESTIONS,
    LOAD_LOGS,
    LOAD_DOCUMENTS,
    LOAD_DOCUMENT,
    LOAD_STATIONS, LOAD_STATIONS_GRAPH,
    LOAD_EXTENDED_UNITS, LOAD_UNIT_REPORTS,
    LOAD_MAINTENANCE_QUESTIONS, LOAD_MAINTENANCE_DETAILS,
    LOAD_DEFAULT_SUBSTATION,
    EDITING_START,
    EDITING_END,
    ERROR,
    NAVIGATE
} from './actionTypes'
import { LANG } from './constants'

let defaultState = {
    language: LANG.EN,
    units: [],
    defaultSubstation: null,
    isMaintenance: false
}

export default function rootReducer(state = defaultState, action) {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return { ...state, language: action.language }

        case LOG_IN:
            return { ...state, token: action.token }
        case LOG_OUT:
            return { language: state.language }

        case LOAD_TOKEN:
            return { ...state, token: action.token }
        case LOAD_USER_ID:
            return { ...state, userId: action.userId }
        case LOAD_COMPANY_ID:
            return { ...state, companyId: action.companyId }

        case LOAD_LOCATIONS:
            return { ...state, locations: action.locations }
        case LOAD_CHILD_LOCATIONS:
            return { ...state, childLocations: action.childLocations }
        case LOAD_UNITS:
            return { ...state, units: action.units }
        case LOAD_DEFAULT_SUBSTATION:
            return { ...state, defaultSubstation: action.defaultSubstationId }

        case LOAD_ACTIVITIES:
            return { ...state, activities: action.activities }
        case LOAD_PLANNED_ACTIVITIES:
            return { ...state, plannedActivities: action.activities }
        case LOAD_ACTIVITY_DETAILS:
            return { ...state, activityDetails: action.activityDetails }
        case LOAD_ACTIVITY_QUESTIONS:
            return { ...state, activityQuestions: action.activityQuestions }
        case LOAD_UNIT_QUESIONS: {
            unitQuestions = state.unitQuestions || {}
            unitQuestions[action.unitId] = action.questions
            return { ...state, unitQuestions: unitQuestions }
        }
        case LOAD_SITE_QUESTIONS:
            return { ...state, siteQuestions: action.siteQuestions }

        case LOAD_STATIONS:
            return { ...state, stations: action.stations }
        case LOAD_STATIONS_GRAPH:
            return { ...state, stationsGraph: action.stationsGraph }

        case LOAD_EXTENDED_UNITS:
            return { ...state, extendedUnits: action.extendedUnits }
        case LOAD_UNIT_REPORTS: {
            unitReports = state.unitReports || {}
            unitReports[action.unitId] = action.unitReports
            return { ...state, unitReports: unitReports }
        }

        case LOAD_LOGS:
            return { ...state, logs: action.logs }

        case LOAD_DOCUMENTS:
            return { ...state, documents: action.documents }
        case LOAD_DOCUMENT:
            return { ...state, documents: [...state.documents, action.document] }

        case LOAD_MAINTENANCE_QUESTIONS:
            return { ...state, maintenanceQuestions: action.maintenanceQuestions }
        case LOAD_MAINTENANCE_DETAILS:
            return { ...state, maintenanceDetails: action.maintenanceDetails }


        case ERROR:
            return { ...state, error: action.error }

        case EDITING_START:
            return { ...state, isEditing: action.isEditing }
        case EDITING_END:
            return { ...state, isEditing: action.isEditing }
        case NAVIGATE:
            if (action.target == "Activities")
                return { ...state, target: action.target, isMaintenance: true }
            else if (action.target == "History")
                return { ...state, target: action.target, isMaintenance: false }
            else
                return { ...state, target: action.target }


        default:
            return state
    }
}