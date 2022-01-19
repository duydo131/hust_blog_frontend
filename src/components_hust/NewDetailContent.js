import { useState, useEffect } from 'react';
import './../styled_components/NewDetailContent.css'
import Post from './Post'
import { actEnableToast } from './../action/index'
import callApiHttp from "./callApiHttp"
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination'

export default function NewDetailContent() {
  const emptyPosts = [
    {
      id: "",
      image: null,
      title: "Bạn chưa có bài viết nào",
      date: "Bạn chưa có bài viết nào",
      shortDescription: "Bạn chưa có bài viết nào Bạn chưa có bài viết nàoBạn chưa có bài viết nàoBạn ch....................................................... ...............................................",
    },
  ]

  const [totalSize, setTotalSize] = useState(0);
  const [limit, setLimit] = useState(0);
  const [size, setSize] = useState(5)
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])

  const dispatch = useDispatch();
  const toast = (message) => dispatch(actEnableToast(message));
  const isManager = useSelector(state => state.manager)
  const slug = useSelector(state => state.slug)

  async function getPosts(p) {
    let request = isManager ? {
      url: `/posts/all/my`,
      method: 'GET',
      params: {
        'size': size,
        'page': p - 1,
      }
    } : {
      url: `/posts/all/${slug.title}`,
      method: 'GET',
      params: {
        'size': size,
        'page': p - 1,
      }
    }
    try {
      const res = await callApiHttp(request)
      const { data } = res
      if (res.status === 200) {
        if (isManager) {
          setPosts(data.content)
          setTotalSize(data.totalElements)
          setLimit(data.totalPages)
        } else {
          setPosts(data.content.content)
          setTotalSize(data.content.totalElements)
          setLimit(data.content.totalPages)
        }

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

  useEffect(() => {
    getPosts(1);
  }, [isManager, slug]);

  const changePage = (p) => {
    setPage(p)
    getPosts(p);
  }

  const genPosts = () => {
    let renderPosts = posts;
    if (posts.length === 0) renderPosts = emptyPosts
    return renderPosts.map((post, index) =>
      <Post
        key={index}
        idx={post.id}
        image={post.image}
        title={post.title}
        date={post.date}
        shortDescription={post.shortDescription}
      />
    )
  }

  return (
    <div class="portlet-column span7 Hust_Tintuc-row2-cot2 new-left" id="column-3" style={{ marginLeft: '10%', width: '55%' }}>
      <div style={{marginBottom:'3%'}}>
        {totalSize > 5 ? (
          <>
            <Pagination
              totalSize={totalSize}
              pageLimit={limit}
              dataLimit={5}
              changePageLoading={changePage}
            />
          </>
        ) : (<div></div>)}
      </div>
      <div class="portlet-dropzone portlet-column-content" id="layout-column_column-3">
        <div
          class="portlet-boundary portlet-boundary_1_WAR_portalnewspublisherportlet_ portlet-static portlet-static-end portlet-borderless portal-newspublisher-portlet "
          id="p_p_id_1_WAR_portalnewspublisherportlet_INSTANCE_pIrCQOjLR74r_">
          <span id="p_1_WAR_portalnewspublisherportlet_INSTANCE_pIrCQOjLR74r"></span>
          <div class="portlet-borderless-container" style={{}}>
            <div class="portlet-body">
              <div class="news-wrapper ">
                <div class="tintuc60-news" style={{}}>
                  {genPosts()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}