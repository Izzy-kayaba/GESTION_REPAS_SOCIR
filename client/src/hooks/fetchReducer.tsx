
export const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    data: []
}

export const ACTION_TYPES = {
    FECTH_START: "FECTH_START",
    FECTH_SUCCESS: "FECTH_SUCCESS",
    FECTH_ERROR: "FECTH_ERROR"
}

export const dataReducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.FECTH_START:
            return {
                isLoading: true,
                isError: false,
                data: []
            };
        case ACTION_TYPES.FECTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case ACTION_TYPES.FECTH_ERROR:
            return {
                isLoading: false,
                isError: true,
                data: []
            };
        default:
            return state
    }
}


