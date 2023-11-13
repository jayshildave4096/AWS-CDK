import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { RootState } from "../../redux"
import { Card, CardContent, Button, Grid, Input, Typography} from "@mui/material"
import axios from "axios"

const mapStateToProps = (state:RootState) => {
    return {notices: state.notices}
}

export type Notice = {
    [key: string]: any;
};


const Notices= () => {
    const [univData, setunivData] = useState({})
    const [feedback, setFeedback] = useState([])
    
    const API_URL = 'https://fj2gsuxxb1.execute-api.us-east-1.amazonaws.com/prod'
    
    // runs once when page loads for the first time
    useEffect(()=>{
       axios.get(API_URL + '/notices').then((res)=>{
        console.log(res.data)
        setFeedback(res.data)
    })

    axios.get(API_URL + '/boards').then((res)=>{
        console.log(res.data)
        setunivData(res.data[0][0])
    })
        
    },[])

    const handleSubmit = () =>{
        const ele = document.getElementById("text-box")
        const value = ele !== null ? ele.value : null // @ts-nocheck.
        // todo change Id to be random number in string 
        axios.post(API_URL  + '/notices', JSON.stringify({"id":"2", "title": value})).then((res)=> {
            console.log(res)
            window.location.href = '/'
        })
    }

    if (feedback.length === 0){
        return null
    }

    return (
        <>
        
    
        <Grid container>
        <Card>
        <CardContent> 
            <Typography variant="body1">{univData.TITLE}</Typography>
            <Typography variant="body1">{univData.STUDENT_COUNT}</Typography>
            <Typography variant="body1">{univData.faculty_count}</Typography>
            <Typography variant="body1">{univData.DEPT_COUNT}</Typography>
            <Typography variant="body1">{univData.PHONE}</Typography>
            <Typography variant="body1">{univData.ACHIEVEMENT}</Typography></CardContent>
            </Card>
           
        </Grid>
        <Grid container>
        <Input id="text-box"/> <Button onClick={handleSubmit}>Add</Button>
        </Grid>
        </>
       
        
    )
}



export default connect(mapStateToProps)(Notices)