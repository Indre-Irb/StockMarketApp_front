import React, {useEffect, useState} from 'react';
import './Stock.scss'
import CompanyInfoTable from "../CompanyInfoTable/CompanyInfoTable";
import DatePickerComp from "../DatePicker/DatePickerComp";
import {Button, TextField} from "@mui/material";
import http from "../../plugins/http";

const Stock = () => {

        const [companyName, setCompanyName] = useState("")
        const [errorMessage, setErrorMessage] = useState("")
        const [companyProfile, setCompanyProfile] = useState(null)
        const [stockPrice, setStockPrice] = useState(null)
        const [companyInfo, setCompanyInfo] = useState([])
        const [selectedDateFrom, setSelectedDateFrom] = useState("")
        const [selectedDateUntil, setSelectedDateUntil] = useState("")

        const API_KEY = 'cc0aeu2ad3idf21iupk0';

        //Upload search history from datebase
        useEffect(() => {
            http.get('showHistory').then(res => res.success && setCompanyInfo(res.allHistory))
        }, [])

        //Save new search into datebase
        useEffect(() => {
            if (companyProfile && stockPrice) {
                const newInfo = {
                    data: companyProfile,
                    info: stockPrice
                }
                http.post(newInfo, 'addSearch').then(res => res.success && setCompanyInfo([...companyInfo, res.stock]))
            }
        }, [stockPrice])

        //Fetching information from API
        function fetchCompanyInfo() {
            let API_CALL_INFO = `https://finnhub.io/api/v1/stock/profile2?symbol=${companyName}&token=${API_KEY}`
            let API_CALL_PRICE = `https://finnhub.io/api/v1/stock/candle?symbol=${companyName}&resolution=D&from=${selectedDateFrom}&to=${selectedDateUntil}&token=${API_KEY}`
            fetch(API_CALL_INFO).then((res) => res.json().then((data) => {
                if (Object.keys(data).length !== 0) {
                    return setCompanyProfile(data)
                } else {
                    setErrorMessage("Results not found")
                }
            }))
            fetch(API_CALL_PRICE).then((res) => res.json().then((data) => {
                return setStockPrice(data)
            }))
        }

        function getCompanyDetails(event) {
            event.preventDefault()
            fetchCompanyInfo()
        }
        //Validate search typing
        function handleChange(event) {
            setCompanyName(event.target.value)
            const onlyLettersAndSpaces = /^[a-zA-Z\s]*$/;
            if (companyName.length > 35 || !companyName.match(onlyLettersAndSpaces)) {
                setErrorMessage("Invalid Company Name")
            } else {
                setErrorMessage("")
            }
        }

        //Set selected dates
        function dateFrom(value) {
            setSelectedDateFrom(value)
        }

        function dateUntil(value) {
            setSelectedDateUntil(value)
        }

        //Remove all search history from datebase
        function clearHistory() {
            http.get('clearHistory').then((res) => {
                if (res.success) {
                    setCompanyInfo([])

                }
            })
        }

        return (
            <div className='mainPage'>
                <div className='pageTop'>
                    <h1>Stock Market App</h1>
                    <div className='mainContainer'>
                        <DatePickerComp dateFrom={dateFrom} dateUntil={dateUntil}/>
                        <div className='searchContainer'>
                            <div className='searchField'>
                                <div className='errorMessage'>
                                    {errorMessage}
                                </div>
                                <div className='inputField'>
                                    <TextField
                                        sx={{background: '#fff'}}
                                        variant='outlined'
                                        size='small'
                                        value={companyName}
                                        id="companyName"
                                        name="companyName"
                                        onChange={handleChange} label="Enter company's NASDAQ name"/>
                                    <Button variant='contained' sx={{marginLeft: 2, background: '#173A5E'}}
                                            onClick={getCompanyDetails}>Search</Button>
                                </div>
                            </div>
                            <div>
                                <Button sx={{maxWidth: '200px', fontSize: '9px', background: '#173A5E'}} variant='contained'
                                        onClick={clearHistory} size='small'>Clear search history</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pageBottom'>
                    {companyInfo &&
                        <CompanyInfoTable companyInfo={companyInfo}/>}
                </div>
            </div>
        );
    }
;

export default Stock;