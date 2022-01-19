import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import callApiHttp from "./callApiHttp"
import { useState, useEffect } from 'react';
import { actEnableToast } from './../action/index'
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ListUsers() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const toast = (message) => dispatch(actEnableToast(message));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await callApiHttp({
          url: `/users`,
          method: 'GET',
        })

        const { data } = res

        if (res.status === 200) {
          setUsers(data.content)
        }
      } catch (err) {
        toast("Error Server")
      }
    }
    fetchUsers();
  }, []);

  return (
    <div style={{ marginLeft: '30%' }}>
      <div><h4 className='center-block' style={{ width: '100%', textAlign: 'center' }}>Danh sách người dùng</h4></div>
      <div className='center-block' style={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Tài&nbsp;khoản</TableCell>
                <TableCell align="right">Mật&nbsp;khẩu</TableCell>
                <TableCell align="right">Số &nbsp;lượng&nbsp;bài&nbsp;viết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.rawPassword}</TableCell>
                  <TableCell align="right">{user.numPosts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
