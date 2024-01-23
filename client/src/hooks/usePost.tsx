import React, { useReducer } from 'react';
import { ACTION_TYPES, INITIAL_STATE, dataReducer } from './httpReducer';
import { toast } from 'react-toastify';

type Props = {
    endpoint: string;
};

const usePost = ({ endpoint }: Props) => {
    const httpPost = async (data: any) => {
        try {
            const response = fetch(`${process.env.REACT_APP_DEV_MODE}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response;
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(`${error}`, { position: toast.POSITION.TOP_RIGHT });
        }
    };

    // Return the httpPost function for external components to trigger
    return {  httpPost };
};

export default usePost;
