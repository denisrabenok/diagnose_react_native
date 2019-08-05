import axios from "axios";

import { ERROR } from "../actionTypes";
import { API_URL } from "../constants";
import { addDocumentToMessage } from "./documentController";

export const addMessage = (token, message) => dispatch => {
  let attachments = message.attachments;
  console.log(message);
  message = mapNewMessage(message);

  axios
    .post(`${API_URL}/messages/`, message, {
      headers: { Authorization: `token ${token}` }
    })
    .then(response => {
      let id = response.data.id;
      let docIds = [];
      console.log("id " + id);
      attachments.map(document => {
        addDocumentToMessage(token, id, document).then(id => docIds.push(id));
      });

      message.id = id;
      message.attachments = docIds;
    })
    .catch(error => console.log("error.message", error.message));
};

const mapNewMessage = message => ({
  type: message.eventId,
  location: message.locationId,
  unit: message.unitId,
  author: message.responsibleId,
  payload: message.comment,
  title: message.subject
});

const dispatchError = error => ({
  type: ERROR,
  error
});
