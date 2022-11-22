import * as types from '../actionFolder/actionTypes';

const initialState = {
    username: '',
    userId: 0
};

const userReducers = (state = initialState, action) => {
    switch (action.type) { 
        case types.LOG_IN:
            return {
                ...state,
                username: action.payload.info,
                userId: action.payload.id
              };
        
    }
    return state
}
export default userReducers;