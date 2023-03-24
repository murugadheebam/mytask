import axios from 'axios';
import config from '../apiconfig';

export function createcourse (data){
    return config.post('course/create',data)
}