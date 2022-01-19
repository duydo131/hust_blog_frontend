import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, Grid, Snackbar, Slide } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { actEnableToast } from './../action/index'
import callApiHttp from "./callApiHttp"


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Register(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));
  const { onSuccess } = props;

  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [slug, setSlug] = useState('')
  const [slugs, setSlugs] = useState([
    {
      id: 0,
      title: "tin-tuc",
      name: "Tin tức"
    },
    {
      id: 1,
      title: "hoat-dong-chung",
      name: "Hoạt động chung"
    },
    {
      id: 2,
      title: "cong-tac-dang-va-doan-the",
      name: "Công tác Đảng và Đoàn thể"
    },
    {
      id: 3,
      title: "dao-tao",
      name: "Đào tạo"
    },
    {
      id: 4,
      title: "khoa-hoc-cong-nghe",
      name: "Khoa học - công nghê"
    },
    {
      id: 5,
      title: "hop-tac-doi-ngoai-truyen-thong",
      name: "Hợp tác - Đối ngoại - Truyền thông"
    },
    {
      id: 6,
      title: "to-chuc-nhan-su",
      name: "Tổ chức - nhân sự"
    },
    {
      id: 7,
      title: "thong-bao",
      name: "Thông báo"
    },
    {
      id: 8,
      title: "su-kien-sap-dien-ra",
      name: "Sự kiện sắp diễn ra"
    },
    {
      id: 9,
      title: "tin-tuc-hoc-bong",
      name: "Tin tức - Học bổng"
    },
    {
      id: 10,
      title: "tin-tuc-hoc-bong_tin-tuc",
      name: "Tin tức"
    },
    {
      id: 11,
      title: "tin-tuc-hoc-bong_hoc-bong",
      name: "Học bổng"
    }
  ])

  const getSlugNameById = (id) => {
    for (let i = 0; i < slugs.length; i++) {
      if (slugs[i].id === id) return slugs[i].title
    }
    return ''
  }

  const handleSlugChange = (event) => {
    setSlug(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  async function changePasswordProcess() {
    try {
      const res = await callApiHttp({
        url: `/auth/signup`,
        method: 'POST',
        data: {
          email,
          'slug': getSlugNameById(slug),
        }
      })
      const { data } = res
      if (res.status === 200) {
        toast("Đăng kí thành viên mới thành công")
        onSuccess(data.email, data.username, data.rawPassword)
      }
    } catch (err) {
      toast(err.response.data.message)
    }
  }

  function generate() {
    return slugs.map(s => <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>)
  }

  return (

    <div style={{ marginTop: '1%' }}>
      <div className="container">
        <div className="row" >
          <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 center-block">
            <legend>Đăng kí</legend>

            <Grid container alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  color="secondary"
                  onChange={handleEmailChange} />
              </Grid>
            </Grid>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label" style={{ fonrSize: '20px' }}>slug</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={slug}
                onChange={handleSlugChange}
              >
                {generate()}
              </Select>
            </FormControl>

            <button type="submit" onClick={changePasswordProcess} className="btn center-block" style={{ backgroundColor: "blue", cursor: 'pointer' }}>Đăng kí</button>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
