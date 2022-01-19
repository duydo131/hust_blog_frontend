import { useDispatch, useSelector } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { actEnableToast } from './../action/index'
import callApiHttp from "./callApiHttp"
import { useHistory } from "react-router-dom";
import ComfirmDialog from './ConfirmDialog';

function PostContent(props) {

  let p = useSelector(state => state.post)
  // console.log(p)
  let history = useHistory()
  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));

  const [messageNotification, setMessageNotification] = useState('')
  const [openDialog, setOpenDialog] = useState(false);
  const [publishConst, setPublishConst] = useState(false);
  const [publish, setPublish] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [post, setPost] = useState({})


  const { kind } = props
  if (kind === 'USER') {
    if (!isUser) setIsUser(true)
  } else {
    if (isUser) setIsUser(false)
  }

  useEffect(() => {
    async function getPost() {
      if (p.id !== '') {
        try {
          const res = await callApiHttp({
            url: `/posts/${p.id}`,
            method: 'GET',
          })
          const { data } = res
          console.log(res)
          if (res.status === 200) {
            setPublishConst(data?.content?.published)
            setPublish(data?.content?.published)
            setPost(data?.content)
          }
        } catch (err) {
          if (err.response == null) {
            toast("Error Server")
            return
          }
          if (err.response.status === 401) {
            toast("Bạn không có quyền xem bài viết này")
          }
          else if (err.response.status >= 500) {
            toast("Error Server")
          } else {
            toast(err.response.data.message)
          }
        }
      }
    }
    getPost();
  }, []);

  async function updatePost() {
    if (publishConst === publish) {
      toast("Bạn chưa thay đổi!")
      return
    }
    if (p.id === '') return

    try {
      const res = await callApiHttp({
        url: `/posts/${p.id}`,
        method: 'PATCH',
        data: {
          'published': publish,
        }
      })
      const { data } = res
      if (res.status === 200) {
        toast("Cập nhật bài viết thành công")
        history.push('/new-detail')
      }
    } catch (err) {
      if (err.response == null) {
        toast("Error Server")
        return
      }
      if (err.response.status === 401) {
        toast("Bạn không có quyền chỉnh sửa bài viết này")
      }
      else if (err.response.status >= 500) {
        toast("Error Server")
      } else {
        toast(err.response.data.message)
      }
    }
  }

  const deletePostHandler = () => {
    setOpenDialog(true)
    setMessageNotification("Bạn đồng ý xóa bài viết !!!!!")
  }

  async function deletePost(){
    try {
      const res = await callApiHttp({
        url: `/posts/${p.id}`,
        method: 'DELETE',
      })
      const { data } = res
      if (res.status === 200) {
        toast("Xóa bài viết thành công")
        history.push('/new-detail')
      }
    } catch (err) {
      if (err.response == null) {
        toast("Error Server")
        return
      }
      if (err.response.status === 401) {
        toast("Bạn không có quyền chỉnh sửa bài viết này")
      }
      else if (err.response.status >= 500) {
        toast("Error Server")
      } else {
        toast(err.response.data.message)
      }
    }
  }

  const handleChange = (event) => {
    setPublish(event.target.checked);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  const genUpdatePost = () => {
    return (
      <span style={{ float: 'flex', display: isUser ? 'none' : 'inline' }}>
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
        <Button onClick={updatePost} style={{ cursor: 'pointer' }}>Lưu thay đổi</Button>
        <Button className="btn-danger" onClick={deletePostHandler} style={{ cursor: 'pointer' , marginLeft: '5%'}}>Xóa bài viết</Button>
      </span>
    )
  }

  const formatDate = (date) => {
    return new Date(date).
      toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).
      replace(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');
  }

  return (
    <div class="portlet-column span6 Hust_Tintuc-row2-cot2" id="column-3" style={{ marginLeft: '5%' }}>
      <div class="portlet-dropzone portlet-column-content" id="layout-column_column-3">
        <div class="portlet-boundary portlet-boundary_101_ portlet-static portlet-static-end portlet-borderless portlet-asset-publisher " id="p_p_id_101_INSTANCE_AKFI5qRls1e8_">
          <span id="p_101_INSTANCE_AKFI5qRls1e8"></span>
          <div class="portlet-borderless-container" style={{ width: '500px' }}>
            <div class="portlet-body">
              <div>
                <div class="taglib-header ">
                  {genUpdatePost()}
                  <h4 class="header-title">
                    <div style={{width: 'auto', height: 'auto', color:'#96220e', whiteSpace: 'pre-wrap'}}> {post.title} </div>

                  </h4>
                </div>
                <div class="asset-full-content show-asset-title" style={{ width: '700px' }}>
                  {/* <div class="asset-user-actions">
                    <div class="print-action"> <span class=""> <a href="javascript:_101_INSTANCE_AKFI5qRls1e8_printPage_0();" class=" taglib-icon" id="_101_INSTANCE_AKFI5qRls1e8_rjus_column3_0">
                      <img
                        id="rjus_column3_0"
                        src="./post_files/spacer.png"
                        alt=""
                      // style="background-image: url(&#39;https://www.hust.edu.vn/hust-theme/sprite/images/common/_sprite.png&#39;); background-position: 50% -1238px; background-repeat: no-repeat; height: 16px; width: 16px;"
                      />
                      <span class="taglib-text ">In <span class="hide-accessible">Dấu ấn Bách khoa Hà Nội năm 2021</span></span> </a> </span> </div>
                  </div> */}
                  <div class="asset-content" id="_101_INSTANCE_AKFI5qRls1e8_612571">

                    <div class="journal-content-article" dangerouslySetInnerHTML={{ __html: post.content }}>
                    </div>
                    <br />
                  </div>
                  <div class="asset-metadata">
                    <span class="metadata-entry metadata-publish-date"> {formatDate(post.publishAt ? post.publishAt : post.createAt)} </span>
                    <span class="vertical-separator">
                    </span>
                    <span class="metadata-entry metadata-author"> Bởi {post?.user?.username} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ComfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={deletePost}
        value={messageNotification} />
    </div>
  )
}

export default PostContent;