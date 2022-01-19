import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actEnableManager, actUserStatistic, actCategoryStatistic } from './../action/index'

function LeftMenu() {

  var isAdmin = useSelector(state => state.admin)
  const history = useHistory();
  const dispatch = useDispatch();

  dispatch(actEnableManager())

  const userStatistic = () => dispatch(actUserStatistic());
  const categoryStatistic = () => dispatch(actCategoryStatistic());

  const bars = [
    {
      title: 'Thêm bài viết mới',
      slug: 'add-post',
      children: [],
    },
    {
      title: 'Các bài viết của bạn',
      slug: 'new-detail',
      children: [],
    },
    {
      title: 'Đổi mật khẩu',
      slug: 'change-password',
      children: [],
    }
  ]

  if (isAdmin) bars.push(
    {
      title: 'Đăng kí thành viên mới',
      slug: 'register',
      children: [],
    },
    {
      title: 'Xem danh sách người dùng',
      slug: 'users',
      children: [],
    },
    {
      title: 'Thống kê',
      slug: 'statistic',
      children: [
        {
          title: 'Thể loại',
          type: 'CATEGORY',
        }, {
          title: 'Người dùng',
          type: 'USER',
        },
      ]
    },
  )

  const redirect = (slug) => {
    history.push(slug)
  }

  const changeStatistic = (type) => {
    if(type === "USER") userStatistic();
    else if(type === "CATEGORY") categoryStatistic();
  }

  const generateBar = () => {
    return bars.map((bar, index) =>
      <li key={index} onClick={() => redirect(bar.slug)} style={{ cursor: 'pointer' }}>
        <a>{bar.title}</a>
        <ul>
            {generateChildren(bar.children)}
        </ul>
      </li>
    )
  }

  const generateChildren = (children) => {
    return children.map((bar, index) =>
      <li key={index} onClick={() => changeStatistic(bar.type)} style={{ cursor: 'pointer' }}>
        <a>{bar.title}</a>
      </li>
    )
  }

  return (
    <div class="portlet-column portlet-column-first span3 Hust_Tintuc-row2-cot1" id="column-2">
      <div class="portlet-dropzone portlet-column-content portlet-column-content-first" id="layout-column_column-2">
        <div class="portlet-boundary portlet-boundary_85_ portlet-static portlet-static-end portlet-borderless portlet-site-map " id="p_p_id_85_INSTANCE_xqR5LJMBQJTV_">
          <span id="p_85_INSTANCE_xqR5LJMBQJTV"></span>
          <div class="portlet-borderless-container" style={{}}>
            <div class="portlet-body">
              <ul>
                {generateBar()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftMenu;