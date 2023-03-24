import axios from 'axios';
import config from '../apiconfig';

export function createstaff (data){
    return config.post('staff/create',data,{
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function getallstaff (data){
    return config.get('staff/getstaffs')
}
export function getstaffbyid (id){
    return config.get('staff/getstaffbyid',{params: { id: id}})
}