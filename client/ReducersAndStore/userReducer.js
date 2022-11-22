import * as types from '../actionsFolder/actionTypes';

const initialState = {
    amountOfPets: 0,
    username: ''
};

const userReducers = (state = initialState, action) => {
    switch (action.type) { 
        case types.LOG_IN:
            return {
                ...state,
                username: action.payload.info.username
              };
        
    }
}
export default puserReducers;