
export const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    data: null
}

export const ACTION_TYPES = {
    ACTION_START: "ACTION_START",
    ACTION_SUCCESS: "ACTION_SUCCESS",
    ACTION_ERROR: "ACTION_ERROR"
}

export const dataReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ACTION_START:
            return {
                isLoading: true,
                isError: false,
                data: null
            };
        case ACTION_TYPES.ACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case ACTION_TYPES.ACTION_ERROR:
            return {
                isLoading: false,
                isError: true,
                data: null
            };
        default:
            return state
    }
}



