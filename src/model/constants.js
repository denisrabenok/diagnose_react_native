export const API_URL = 'http://37.152.57.172/back'

export const LANG = {
    EN: 'EN',
    SW: 'SW'
}

export const ACTIVITY_TYPE = [, "Visual Inspection", "Maintenance", "Maintenance Oil", "Maintenance Gas", "Maintenance Tap Changer", "DGA"]

export const EVENT_TYPES = ['Accident', 'Incident', 'Other', 'Operating change',
    'Repair', 'Device moved', 'Lightning strike', 'Reset', 'Cover reset', 'Cover loose']

    
export const MESSAGE_TYPES = ['Common', 'Maintenance info', 'Need attention', 'Plate']

export const DOCUMENT_TYPES = ['Drawing', 'General', 'Manual']

export const DOWNLOAD_ACTIVITY_DOCUMENT_LINK = documentId => API_URL + '/documents/' + documentId + '/view/'