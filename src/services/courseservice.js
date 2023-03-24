import axios from 'axios';
import config from '../apiconfig';

export function createcourse (data){
    return config.post('course/create',data)
}
export function editcourse (data){
    return config.post('course/update',data)
}
export function getallcourse (data){
    return config.get('course/getcourses')
}
export function getcoursebyid (id){
    return config.get('course/getcoursebyid',{params: { id: id}})
}