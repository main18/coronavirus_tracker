import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try{
        const {data} = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed:data.confirmed,
            recovered:data.recovered,
            deaths:data.deaths,
            lastUpdate:data.lastUpdate
        }
        return modifiedData;
    }catch(e){
        console.log('error');
    }

}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifieddata = data.map((dailydata) => (
            {
                confirmed : dailydata.confirmed.total,
                deaths : dailydata.deaths.total,
                data: dailydata.reportDate,
            }
            ));
        return modifieddata;
    }catch(e){
        console.log('error');
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name)
    } catch (e) {
        console.log('error');
    }
}