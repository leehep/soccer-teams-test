import React,{useState,useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow,Paper,Avatar} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  table: {
    minWidth: 370,
  },
  continer:{
    maxWidth:600,margin: '15px auto'
  },
  cell:{
    paddingRight:0
  }
});

export default function DispalyTable({teamsData}){
  const classes = useStyles();
  const [favoritList,setFavoritList]=useState([]);
  const [tableData]=useState(teamsData);

  useEffect(()=>{
    const saveFavList = localStorage.getItem('SoccerTeamFav') || '';
    if (saveFavList!==''){
      setFavoritList(saveFavList.split(','))
    }
  },[])

  const [tableStateTitle]=useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Year', field: 'founded', type: 'numeric' },
      { title: 'Crest',field: 'logo_path',type:'img'}
    ],
  });
  
  const handleFavorit=(e)=>{
    
    const tempTeamId= e.target.id
    const index = favoritList.findIndex(teamId=>teamId===tempTeamId)

    if(index === -1){
      setFavoritList([...favoritList,tempTeamId])
    }else{
      favoritList.splice(index,1)
      setFavoritList(favoritList=>[...favoritList])
    }
  }
  
  useEffect(()=>{
    localStorage.setItem('SoccerTeamFav',favoritList );
  },[favoritList]);

  const changeIcon =(id)=>{
    if(favoritList.findIndex(teamId=>teamId===id.toString())===-1){
      return <FavoriteBorderIcon style={{fill:' #762232'}}/>
    }else{
      return<FavoriteIcon style={{fill:' #762232'}}/>
    }
  }

  
  const TableTitleRow = <TableRow>
    <TableCell></TableCell>
    {tableStateTitle.columns.map((cell,key)=>{
      return<TableCell key={key} align="left">{cell.title}</TableCell> 
    })}
  </TableRow>

  const tableBodyData=tableData?tableData.data.map((row)=>{
   return<TableRow 
            key={row.id} 
            id={row.id} 
            onClick={handleFavorit}
            hover={true}
          >
      <TableCell 
        id={row.id}
        component="th" 
        scope="row" 
        padding="checkbox"
      >
        {changeIcon(row.id)}
      </TableCell>
      <TableCell id={row.id} align="left">{row.name}</TableCell>
      <TableCell id={row.id} align="left">{row.founded}</TableCell>
      <TableCell id={row.id} align="justify" >
        <Avatar alt={row.name} src={row.logo_path} id ={row.id}/>
      </TableCell>
    </TableRow>
  }):''

  return(
    <TableContainer component={Paper} className={classes.continer}>
      <Table className={classes.table} aria-label="team table" size="small">
        <TableHead>
          {TableTitleRow}
        </TableHead>
        <TableBody>
          {tableBodyData}
        </TableBody>
      </Table>
    </TableContainer>
  )
}