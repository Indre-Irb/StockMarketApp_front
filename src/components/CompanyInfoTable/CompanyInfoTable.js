import React, {useState} from 'react';
import AdditionalInfo from "../AditionalInfo/AdditionalInfo";
import "./CompanyInfoTable.scss"
import {Box} from "@mui/material";

const CompanyInfoTable = ({companyInfo}) => {

    const [openInfo, setOpenInfo] = useState(false)
    const [stockPrices, setStockPrices] = useState("")

    //Converting timestamp into Date format
    function convertDate(timestamp) {
        const convertDate = (timestamp*1000)
        return new Date(convertDate).toLocaleDateString('en-GB')
    }

    return (
        <div className="resultTable">
            <div className='searchList'>
                {companyInfo.map((x, index) =>
                    <Box sx={{
                            backgroundColor: '#fff',
                            boxShadow: 1,
                            borderRadius: 2,
                            p: 2,
                            width: 300,
                            marginBottom: 2}}
                        key={index}>
                        <Box sx={{color: '#173A5E', fontSize: 28, fontWeight: 'medium', display: 'inline'}}
                             onClick={() => {
                                 setOpenInfo(true)
                                 setStockPrices(x)}}>
                            {x.companyName}
                        </Box>
                        <Box sx={{color: '#46505A', display: 'inline', marginLeft: 1}}>({x.companyCountry})</Box>
                        <Box sx={{
                                color: '#009688',
                                fontWeight: 'bold',
                                mx: 0.5,
                                fontSize: 14,}}>
                            {x.companyCurrency}
                        </Box>
                        <Box sx={{color: '#46505A', fontSize: 14}}>
                            {x.companyWeb}
                        </Box>
                        <Box sx={{color: 'grey', fontSize: '10px', marginTop: '10px'}}>From {convertDate(x.time[0])} until {convertDate(x.time[x.time.length-1])}</Box>
                    </Box>
                )}
            </div>
            {openInfo &&
                <div className='resultDetails' onClick={()=> setOpenInfo(false)}>
                    <div className='companyName'>{stockPrices.companyName}</div>
                    <AdditionalInfo
                        stockPrices={stockPrices}/>
                </div>}
        </div>
    );
};

export default CompanyInfoTable;