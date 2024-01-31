import React from 'react';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { blue } from '@mui/material/colors';

export const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[200],
    '&:hover': {
        backgroundColor: blue[400],
    },
}));
