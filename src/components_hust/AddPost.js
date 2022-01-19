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
import { actEnableToast, actLogout } from './../action/index'
import callApiHttp from "./callApiHttp"
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddPost() {
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));
  const signout = () => dispatch(actLogout());

  const [publish, setPublish] = useState(true);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [slug, setSlug] = useState('')
  const [slugs, setSlugs] = useState([])
  const [selectedFile, setSelectedFile] = useState();
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    async function getSlugs() {
      try {
        const res = await callApiHttp({
          url: `/slugs/my`,
          method: 'GET',
        })
        const { data } = res
        console.log(res)
        if (res.status === 200) {
          setSlugs(data)
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


  const handleSubmission = (filename) => {
      const formData = new FormData();
      formData.append('file', filename);
      var filename = null;
        fetch(
          'http://localhost:8080/upload',
          {
            method: 'POST',
            body: formData,
          }
        )
        .then(response => response.json())
        .then(result => {
          setAvatar(result.filepath)
          filename = result.filepath;
        })
        .catch(err => console.log("Error: ", err));
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    handleSubmission(event.target.files[0])
  };

  const generateSlugs = () => {
    return slugs.map(s => <MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>)
  }

  const onEditorStateChange = (editor) => {
    setEditorState(editor)
  }

  const handleSlugChange = (event) => {
    setSlug(event.target.value);
  };

  async function editStateHandler() {
    const post = {
      'title': title,
      'short-description': description,
      'content': stateToHTML(editorState.getCurrentContent()),
      'published': publish,
      'image': avatar,
    }
    try {
      const res = await callApiHttp({
        url: `/posts/${getSlugNameById(slug)}`,
        method: 'POST',
        data: post,
      })
      const { data } = res
      if (res.status === 201) {
        toast("Thêm bài viết mới thành công")
        history.push('/new-detail')
      }
    } catch (err) {
      if (err.response == null) {
        toast("Error Server")
        return
      }
      if (err.response.status === 401) {
        toast("Bạn không có quyền thêm bài viết này")
      }
      else if (err.response.status >= 500) {
        toast("Error Server")
      } else {
        toast(err.response.data.message)
      }
    }
  }

  const getSlugNameById = (id) => {
    for (let i = 0; i < slugs.length; i++) {
      if (slugs[i].id === id) return slugs[i].title
    }
    return ''
  }

  const handleChange = (event) => {
    setPublish(event.target.checked);
  }

  const titleHanler = (e) => {
    setTitle(e.target.value)
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }

  function uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID ##clientid###');
        const data = new FormData();
        data.append('file', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          // console.log(response.filepath)
          resolve({ data: { link: response.filepath } });
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          // console.log(error)
          reject(error);
        });
      }
    );
  }

  const config = {
    image: {
      uploadCallback: uploadImageCallBack,
      defaultSize: {
        height: 'auto',
        width: '90%',
      },
    }
  }

  return (

    <div id="content" style={{ display: 'inline-block', marginLeft: '-1%' }}>

      <div class="menuChildMobile"></div>
      <div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
      <div class="Layout12vs363" id="main-content" role="main">
        <div class="portlet-layout row-fluid Hust_Tintuc-row2">
          <div style={{ margin: 'auto' }}>
            <p style={{ marginLeft: '45%', fontSize: '30' }}>Thêm bài viết mới </p>
          </div>
          <div className='editor'>

            <div style={{ marginLeft: '45%' }}>
              <Button onClick={editStateHandler} style={{ cursor: 'pointer' }}>Thêm bài viết</Button>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={publish}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                  />
                }
                style={{ marginLeft: '3%' }}
                label="Công khai"
              />
            </div>
            <div style={{ display: 'flex', width: '125%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '20%' }}>
                Tiêu đề:
              </span>
              <span style={{ width: '100%', marginLeft: '2%' }}>
                <TextareaAutosize
                  aria-label={"Tiêu đề"}
                  placeholder={"Tiêu đề"}
                  minRows={1}
                  maxRows={2}
                  style={{ width: '100%' }}
                  onChange={titleHanler}
                />
              </span>
            </div>

            <div style={{ display: 'flex', width: '125%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '20%' }}>
                Miêu tả ngắn:
              </span>
              <span style={{ width: '100%', marginLeft: '2%' }}>
                <TextareaAutosize
                  aria-label={"Miểu tả ngắn"}
                  placeholder={"Miểu tả ngắn"}
                  minRows={2}
                  maxRows={4}
                  style={{ width: '100%' }}
                  onChange={descriptionHandler}
                />
              </span>
            </div>

            <div style={{ display: 'flex', width: '125%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '20%' }}>
                Slug:
              </span>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" style={{ fonrSize: '20px' }}>slug</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={slug}
                  onChange={handleSlugChange}
                >
                  {generateSlugs()}
                </Select>
              </FormControl>
            </div>
            <div style={{ display: 'flex', width: '125%', marginBottom: '3%', marginTop: '3%' }}>
              <span style={{ width: '20%' }}>
                Ảnh đại diện:
              </span>
              <input type="file" name="file" onChange={changeHandler} style={{ width: '100%' }} />
            </div>

            <div style={{ margin: 'auto' }}>
              <p style={{ marginLeft: '50%', fontSize: '20' }}>Nội dung </p>
            </div>
            <Editor
              editorState={editorState}
              onEditorStateChange={editor => onEditorStateChange(editor)}
              wrapperStyle={{
                width: '700',
                border: "1px solid black"
              }}
              toolbar={config}
            />
          </div>
        </div>
      </div>
    </div>
  );
}