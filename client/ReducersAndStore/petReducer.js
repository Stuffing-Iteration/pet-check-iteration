import * as types from '../actionsFolder/actionTypes';

const initialState = {
    amountOfPets: 0,
    username: ''
};

const petReducers = (state = initialState, action) => {
    switch (action.type) { 
        case types.LOG_IN:
            return {
                ...state,
                username: action.payload.info.username
              };
        
    }
}
export default petReducers;