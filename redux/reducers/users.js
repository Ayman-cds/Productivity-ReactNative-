const initialState = {
    currentUser: null,
};

export const user = (state = initialState, action) => {
    console.log('THIS IS THE ACTION ---->>  ', action.currentUser);
    return {
        ...state,
        currentUser: action.currentUser,
    };
};
