import React, {useState} from 'react';
import "./DatePicker.scss"
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from "@mui/x-date-pickers";

const DatePickerComp = ({dateFrom, dateUntil}) => {

    const [selectedDateFrom, setSelectedDateFrom] = useState(new Date() || null);
    const [selectedDateUntil, setSelectedDateUntil] = useState(new Date() || null);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className='picker'>
                <DesktopDatePicker
                    sx={{background: 'white'}}
                    label="Date from"
                    value={selectedDateFrom}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setSelectedDateFrom(newValue)
                        const dateToTimestamp = Date.parse(newValue.toLocaleString());
                        dateFrom(dateToTimestamp/1000)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                    label="Date until"
                    value={selectedDateUntil}
                    inputFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setSelectedDateUntil(newValue)
                        const dateToTimestamp = Date.parse(newValue.toLocaleString());
                        dateUntil(dateToTimestamp/1000)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default DatePickerComp;