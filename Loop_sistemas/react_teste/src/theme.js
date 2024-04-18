import React from 'react'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            color: '#FFFFFF'
        },
        fontFamily: [
            'Raleway', 'sans-serif'
        ].join(','),
    },
});

export default theme