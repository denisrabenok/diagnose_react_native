import { NAVIGATE } from '../actionTypes'

export const navigate = (target) => {
    dispatch => {
        dispatch(dispatchNavigate(target))
    }
}

const dispatchNavigate = target => ({
    type: NAVIGATE,
    target
}) 