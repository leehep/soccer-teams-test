import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography} from '@material-ui/core';
import DispalyTable from './DisplayTable';
import axios from 'axios';


const api_key=process.env.REACT_APP_API_KEY
const useStyles = makeStyles((theme) => ({
  load: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function DisplaySocoreTeam(){
  const classes = useStyles();
  const [tableData,setTableData]=useState();
  const [isLoading,setLoading]=useState(true)
  
  useEffect(()=>{
    const tempDataArray=[];

    axios.get(`https://soccer.sportmonks.com/api/v2.0/teams/season/16020?api_token=${api_key}`)
      .then((res)=>{  
        res.data.data.map(team => {
          const teamTempData={ 'name':team.name, 
          'founded': team.founded, 
          'logo_path':team.logo_path,
          'id':team.id}
          tempDataArray.push(teamTempData)
        }) 
      }).then(res =>{
        setTableData({data:tempDataArray})
        setLoading(false)
      })
      
      console.log("data live",tempDataArray)
  },[])

  
  const loadingTeams = <div className={classes.root}>
    <CircularProgress color="secondary" />
  </div>

  return(
    <div >
      <Typography variant="h3" >
        Front End Test
      </Typography>
      {isLoading?loadingTeams:<DispalyTable teamsData={tableData} />}
    </div>
  )
}