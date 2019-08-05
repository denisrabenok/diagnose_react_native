import axios from "axios";

import {LOAD_DOCUMENTS, ERROR} from "../actionTypes";
import {API_URL, DOCUMENT_TYPES} from "../constants";

export const loadDocuments = (token, companyId) => async dispatch => {
    await axios
        .get(`${API_URL}/companies/${companyId}/documents`, {
            headers: {Authorization: `token ${token}`}
        })
        .then(response => {
            documents = mapDocuments(response.data);
            dispatch(dispatchLoadDocuments(documents));
        })
        .catch(error => {
            console.log(error);
            dispatch(dispatchError(error));
        });
};

export const loadDocument = (token, documentId) => async dispatch => {
    await axios
        .get(`${API_URL}/documents/${documentId}`, {
            headers: {Authorization: `token ${token}`}
        })
        .then(response => {
            document = getDocument(response.data);
            dispatch(dispatchLoadDocument(document));
        })
        .catch(error => {
            console.log(error);
            dispatch(dispatchError(error));
        });
};

export const addDocument = async (token, logId, document) =>
    await axios
        .post(`${API_URL}/logs/${logId}/attachments/`, document, {
            headers: {Authorization: `token ${token}`}
        })
        .then(response => response.data.id)
        .catch(error => console.log(error.message));

export const addDocumentToActivity = async (token, reportId, document) => {
    console.log('******** addDocumentToActivity ******* token, reportId, document => ',token, reportId, document )
    const file = document.formData;
    const data = {filepath: file, name: document.name};
    if (document.type) data.document_type = document.type;
    if (document.language) data.language = document.language;
    if (document.description) data.description = document.description;

    const formData = new FormData();
    formData.append("filepath", {
        uri: document.uri,
        type: document.fileType,
        name: document.name
    });
    formData.append("name", document.name);
    formData.append("document_type", 1);
    formData.append("description", document.description || '');
    formData.append("language", document.language === 'Swedish' ? 'sv' : 'en');

    console.warn('uri: ', document.uri);
    console.warn('type: ', document.type);
    console.warn('file type: ', document.fileType);
    console.warn('name: ', document.name);
    console.warn('langage: ', document.language === 'Swedish' ? 'sv' : 'en');
    // console.warn('langage: ', document.descr);
    await axios
        .post(
            `${API_URL}/round-reports/${reportId}/documents/`,
            formData,
            // {
            //     file: file,
            //     data: data,
            //     name: document.name,
            //     // language: document.language,
            //     // document_type: document.type,
            //     // description: document.description,
            //
            //     filepath: data,
            //     description: document.description,
            //     document_type: 1, // ?
            //     // filepath: document.uri,
            //     language: 'sv',
            //     // name: document.name
            // },
            {
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json"
                }
            }
        )
        .then(response => console.log('document to activity response ', response.data))
        .catch(error => {
            console.log('document to activity error response ', error.response);
            console.log('document to activity error ', JSON.stringify(error))
        });
};
export const addDocumentToMaintenance = async (token, reportId, document) => {
    console.log('******** addDocumentToMaintenance ******* token, reportId, document => ',token, reportId, document )
    const file = document.formData;
    const data = {filepath: file, name: document.name};
    if (document.type) data.document_type = document.type;
    if (document.language) data.language = document.language;
    if (document.description) data.description = document.description;

    const formData = new FormData();
    formData.append("filepath", {
        uri: document.uri,
        type: document.fileType,
        name: document.name
    });
    formData.append("name", document.name);
    formData.append("document_type", 1);
    formData.append("description", document.description || '');
    formData.append("language", document.language === 'Swedish' ? 'sv' : 'en');

    console.warn('uri: ', document.uri);
    console.warn('type: ', document.type);
    console.warn('file type: ', document.fileType);
    console.warn('name: ', document.name);
    console.warn('langage: ', document.language === 'Swedish' ? 'sv' : 'en');
    // console.warn('langage: ', document.descr);
    await axios
        .post(
            `${API_URL}/maintenance-reports/${reportId}/documents/`,
            formData,
            // {
            //     file: file,
            //     data: data,
            //     name: document.name,
            //     // language: document.language,
            //     // document_type: document.type,
            //     // description: document.description,
            //
            //     filepath: data,
            //     description: document.description,
            //     document_type: 1, // ?
            //     // filepath: document.uri,
            //     language: 'sv',
            //     // name: document.name
            // },
            {
                headers: {
                    Authorization: `token ${token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json"
                }
            }
        )
        .then(response => console.log('document to activity response ', response.data))
        .catch(error => {
            console.log('document to activity error response ', error.response);
            console.log('document to activity error ', JSON.stringify(error))
        });
};

export const addDocumentToMessage = async (token, logId, document) => {
    console.log("TCL: addDocumentToMessage -> document", document);
    file = document;
    const formData = new FormData();
    formData.append("filepath", {
        uri: file.filepath,
        type: "image/jpeg",
        name: `${file.name}.jpeg`
    });
    formData.append("name", document.name);
    await axios
        .post(`${API_URL}/messages/${logId}/attachments/`, formData, {
            headers: {
                Authorization: `token ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => console.log(response.data.id))
        .catch(error => console.log(error.message));
};

const mapDocuments = documents =>
    documents.map(document => ({
        name: document.name || "",
        type: document.type,
        language: document.language || "",
        description: document.description || ""
    }));

const getDocument = document => ({
    name: document.name || "",
    type: document.type,
    language: document.language || "",
    description: document.description || ""
});

const dispatchLoadDocuments = documents => ({
    type: LOAD_DOCUMENTS,
    documents
});

const dispatchLoadDocument = document => ({
    type: LOAD_DOCUMENT,
    document
});

const dispatchError = error => ({
    type: ERROR,
    error
});
