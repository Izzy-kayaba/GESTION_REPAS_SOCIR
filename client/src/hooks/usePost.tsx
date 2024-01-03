import React, { useReducer } from 'react';
import { ACTION_TYPES, INITIAL_STATE, dataReducer } from './httpReducer';
import { toast } from 'react-toastify';

type Props = {
    endpoint: string;
};

const usePost = ({ endpoint }: Props) => {

    const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);

    const httpPost = async (data: any) => {

        dispatch({ type: ACTION_TYPES.ACTION_START });
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_MODE}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                dispatch({ type: ACTION_TYPES.ACTION_SUCCESS, payload: responseData });
                // Show success toast
                toast.success('Ajouter avec succes !!', { position: toast.POSITION.TOP_RIGHT });
                console.log('Data added successfully!');
            } else {
                dispatch({ type: ACTION_TYPES.ACTION_ERROR });
                // Show error toast
                toast.error("Une erreur s'est produite ! ", { position: toast.POSITION.TOP_RIGHT });
                console.error('Failed to create new data:', response.statusText);
            }
        } catch (error) {
            dispatch({ type: ACTION_TYPES.ACTION_ERROR });
            console.error('Error submitting form:', error);
            // Show error toast
            toast.error(`${error}`, { position: toast.POSITION.TOP_RIGHT });
        }
    };

    // Return the httpPost function for external components to trigger
    return { state, httpPost };
};

export default usePost;
