import Vue from 'vue';
// let axios = Vue.prototype.$http;
import axios from 'axios';

const getAllVessel = async () => {
    try {
        console.log(process.env);
        console.log('prot:',Vue.prototype);
        const req = await axios(process.env.VUE_APP_BACKEND+'/vessel')
        if (req.data) {
            return req.data
        }else {
            throw new Error("error acquired")
        }
    } catch (err) {
        console.log('err:',err);
    }
}

export {getAllVessel}