import React, { useEffect, useReducer } from 'react';
import { ACTION_TYPES, INITIAL_STATE, dataReducer } from './../hooks/fetchReducer';

type Props = {
    endpoint: string;
    fetchedData?: any;
}

const useFetch: React.FC<Props> = ({ endpoint }: Props) => {
    const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: ACTION_TYPES.FECTH_START });
            try {
                const response = await fetch(`${process.env.REACT_APP_DEV_MODE}/${endpoint}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                dispatch({ type: ACTION_TYPES.FECTH_SUCCESS, payload: data });
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch({ type: ACTION_TYPES.FECTH_ERROR });
            }
        };

        fetchData();
    }, [endpoint, state]); // Added dependency on endpoint to re-fetch when it changes

    return state; // Return the state for the component using this hook
};

export default useFetch;