import React from 'react';
import './AdditionalInfo.scss'

const AdditionalInfo = ({stockPrices}) => {

    //Converting timestamp into Date format
    function convertDate(timestamp) {
        const convertDate = (timestamp * 1000)
        return new Date(convertDate).toLocaleDateString('en-GB')
    }

    return (
        <div>
            {stockPrices.openPrice && stockPrices.openPrice.map((price, index) => <div key={index} className='priceInformation'>
                <div className='dateField'>Date: {convertDate(stockPrices.time[index])}</div>
                <div className='priceField'>
                    <div>
                        Open price: {stockPrices.openPrice[index].toFixed(3)}
                    </div>
                    <div>
                        Highest price: {stockPrices.highestPrice[index].toFixed(3)}
                    </div>
                    <div>
                        Lowest price: {stockPrices.lowestPrice[index].toFixed(3)}
                    </div>
                    <div>
                        Closing price: {stockPrices.closingPrice[index].toFixed(3)}
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default AdditionalInfo;