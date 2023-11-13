import axios from "axios"


const API_URL = 'https://fj2gsuxxb1.execute-api.us-east-1.amazonaws.com/prod'

export const getPosts = async () =>{
    const r = await axios.get(API_URL + '/notices')
    return r.data
}