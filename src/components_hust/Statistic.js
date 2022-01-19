import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from 'react';
import { EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { stateToHTML } from 'draft-js-export-html';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { actEnableToast, actLogout } from '../action/index'
import callApiHttp from "./callApiHttp"
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import BarChart from './BarChart'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Statistic() {
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));
  const signout = () => dispatch(actLogout());

  const [homeId, setHomeId] = useState()
  const [title, setTitle] = useState('theo Thể loại')
  const [display, setDisPlay] = useState(true)
  const [isChangeStatistic, setIsChangeStatistic] = useState(true)
  const [slug, setSlug] = useState('')
  const [nameChart, setNameChart] = useState('')
  const [slugs, setSlugs] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  const [categoryInfo, setCategoryInfo] = useState({
    numberOfPost: 0,
    numberOfPostPublished: 0,
    numberOfPostNotPublished: 0,
  })

  const [userInfo, setUserInfo] = useState({
    numberOfPost: 0,
    numberOfUser: 0,
  })

  const typeStatistic = useSelector(state => state.statistic)
  if(typeStatistic.type === "USER"){
    if(isChangeStatistic){
      setIsChangeStatistic(false);
    } 
  }else{
    if(!isChangeStatistic) setIsChangeStatistic(true)
  }

  console.log("isChangeStatistic: ", isChangeStatistic)

  const handleSlugChange = async (event) => {
    const slugTitle = event.target.value;
    setSlug(slugTitle);
    await fetchStatistic(getSlugNameById(slugTitle));
  }

  const generateSlugs = () => {
    return slugs.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)
  }

  useEffect(() => {
    async function getSlugs() {
      try {
        const res = await callApiHttp({
          url: `/slugs/statistic`,
          method: 'GET',
        })
        const { data } = res
        console.log(res)
        if (res.status === 200) {
          setSlugs(data)
          setSlug(data[0].id)
          setHomeId(data[0].id)
        }
      } catch (err) {
        if (err.response == null) {
          toast("Error Server")
          return
        }
        if (err.response.status === 401 || err.response.status === 403) {
          toast("Bạn không có quyền")
          signout()
        }
        else if (err.response.status >= 500) {
          toast("Error Server")
        } else {
          toast(err.response.data.message)
        }
      }
    }
    getSlugs();
  }, []);

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        const res = await callApiHttp({
          url: `/posts/all/statistic`,
          method: 'GET',
          params: {
            'type': "CATEGORY",
            'limit': 5,
            'title': "trang-chu"
          }
        })
        const { data } = res
        if (res.status === 200) {
          setDisPlay(true)
          setTitle('theo Thể loại');
          setCategoryInfo({
            numberOfPost: data.numberOfPost,
            numberOfPostPublished: data.numberOfPostPublished,
            numberOfPostNotPublished: data.numberOfPostNotPublished,
          })
          setNameChart("Thống kê theo các thể loại con của Trang chủ");
          setChartData({
            labels: data.data.map((category) => category.name),
            datasets: [
              {
                label: "Tất cả bài viết",
                data: data.data.map((category) => category.numberOfPost),
                backgroundColor: [
                  "#ffbb11",
                ]
              },
              {
                label: "Bài viết công khai",
                data: data.data.map((category) => category.numberOfPublished),
                backgroundColor: [
                  "#081b3d",
                ]
              },
              {
                label: "Bài viết chưa công khai",
                data: data.data.map((category) => category.numberOfNotPublished),
                backgroundColor: [
                  "#ff1111",
                ]
              }
            ]
          });
        }
      } catch (err) {
        if (err.response == null) {
          toast("Error Server")
          return
        }
        if (err.response.status === 401 || err.response.status === 403) {
          toast("Bạn không có quyền")
          signout()
        }
        else if (err.response.status >= 500) {
          toast("Error Server")
        } else {
          toast(err.response.data.message)
        }
      }
    }
    if(isChangeStatistic) {
      fetchStatistic()
      setSlug(homeId)
    }
  }, [isChangeStatistic]);

  const getSlugNameById = (id) => {
    for (let i = 0; i < slugs.length; i++) {
      if (slugs[i].id === id) return slugs[i]
    }
    return ''
  }

  const fetchStatistic = async (slugObject) => {
    try {
      const res = await callApiHttp({
        url: `/posts/all/statistic`,
        method: 'GET',
        params: {
          'type': "CATEGORY",
          'limit': 8,
          'title': slugObject.title,
        }
      })
      const { data } = res
      if (res.status === 200) {
        setDisPlay(true)
        setNameChart(`Thống kê theo các thể loại con của ${slugObject.name}`);
        setChartData({
          labels: data.data.map((category) => category.name),
          datasets: [
            {
              label: "Tất cả bài viết",
              data: data.data.map((category) => category.numberOfPost),
              backgroundColor: [
                "#ffbb11",
              ]
            },
            {
              label: "Bài viết công khai",
              data: data.data.map((category) => category.numberOfPublished),
              backgroundColor: [
                "#081b3d",
              ]
            },
            {
              label: "Bài viết chưa công khai",
              data: data.data.map((category) => category.numberOfNotPublished),
              backgroundColor: [
                "#ff1111",
              ]
            }
          ]
        });
      }
    } catch (err) {
      if (err.response == null) {
        toast("Error Server")
        return
      }
      if (err.response.status === 401 || err.response.status === 403) {
        toast("Bạn không có quyền")
        signout()
      }
      else if (err.response.status >= 500) {
        toast("Error Server")
      } else {
        toast(err.response.data.message)
      }
    }
  }

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        const res = await callApiHttp({
          url: `/posts/all/statistic`,
          method: 'GET',
          params: {
            'type': "USER",
            'limit': 10,
          }
        })
        const { data } = res
        if (res.status === 200) {
          setDisPlay(false)
          setTitle("theo Người dùng")
          setUserInfo({
            numberOfPost: data.numberOfPost,
            numberOfUser: data.numberOfUser,
          })
          setNameChart("Thống kê theo người dùng");
          setChartData({
            labels: data.data.map((category) => category.username),
            datasets: [
              {
                data: data.data.map((category) => category.numberOfPost),
                backgroundColor: [
                  "#ffbb11",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0",
                  "#1115ff",
                  "#d311ff",
                  "#ff11b4",
                  "#ff1141",
                  "#e3a1ae"
                ]
              },
            ]
          });
        }
      } catch (err) {
        if (err.response == null) {
          toast("Error Server")
          return
        }
        if (err.response.status === 401 || err.response.status === 403) {
          toast("Bạn không có quyền")
          signout()
        }
        else if (err.response.status >= 500) {
          toast("Error Server")
        } else {
          toast(err.response.data.message)
        }
      }
    }
    if(!isChangeStatistic) fetchStatistic()
  }, [isChangeStatistic]);

  return (

    <div id="content" style={{ display: 'inline-block', marginLeft: '-1%' }}>

      <div class="menuChildMobile"></div>
      <div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
      <div class="Layout12vs363" id="main-content" role="main">
        <div class="portlet-layout row-fluid Hust_Tintuc-row2">
          <div style={{ margin: 'auto' }}>
            <p style={{ marginLeft: '45%', fontSize: '30', width: '100%' }}>Thống kê {title}</p>
          </div>
          <div className='editor'>
            <div style={{ display: isChangeStatistic ? 'flex' : 'none', width: '110%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '20%', marginTop: '5%' }}>
                Thể loại:
              </span>
              <FormControl className={classes.formControl} >
                <InputLabel id="demo-simple-select-label" style={{ fonrSize: '20px' }}>thể  loại</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={slug}
                  onChange={handleSlugChange}
                  style={{width: 'fit-content'}}
                >
                  {generateSlugs()}
                </Select>
              </FormControl>
              <span style={{ width: '60%', marginLeft: '10%' }}>
                <p style={{ width: '100%', marginTop: '5%' }}>
                  Tổng số lượng bài viết : {categoryInfo.numberOfPost}
                </p>

                <p style={{ width: '100%', marginTop: '5%' }}>
                  Tổng số lượng bài viết đã công khai : {categoryInfo.numberOfPostPublished}
                </p>

                <p style={{ width: '100%', marginTop: '5%' }}>
                  Tổng số lượng bài viết chưa công khai: {categoryInfo.numberOfPostNotPublished}
                </p>
              </span>

            </div>
            <div style={{ display: isChangeStatistic ? 'none' : 'flex', width: '100%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '60%', marginLeft: '30%' }}>
                <p style={{ width: '100%', marginTop: '5%' }}>
                  Tổng số lượng bài viết : {userInfo.numberOfPost}
                </p>

                <p style={{ width: '100%', marginTop: '5%' }}>
                  Tổng số người dùng : {userInfo.numberOfUser}
                </p>
              </span>

            </div>
            <div style={{ display: 'flex', width: '125%', marginBottom: '3%', marginTop: '3%' }}>
              <BarChart chartData={chartData} nameChart={nameChart} legendDisplay={display}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}