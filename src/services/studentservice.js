import axios from 'axios';
import config from '../apiconfig';

export function createstudent (data){
    return config.post('student/create',data,{
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function getallstudents (data){
    return config.get('student/getstudents')
}
export function getstudentbyid (id){
    return config.get('student/getstudentsbyid',{params: { id: id}})
}
export function updatestudent (data){
    return config.post('student/update',data,{
        headers: {
            "content-type": "multipart/form-data",
        },
    })
}
export function deletestudent (id){
    return config.get('student/deletestudent',{params: { id: id}})
}