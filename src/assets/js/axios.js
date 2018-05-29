import axios from 'axios';


const instance = axios.create({
    baseURL:'https://bhs2.sharepoint.com/sites/dkendy'
});


export default instance;
