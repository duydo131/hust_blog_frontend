import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actChangeSlug, actDisableManager } from './../action/index';
import { useState, useEffect } from "react";
import { actEnableToast } from './../action/index'
import callApiHttp from "./callApiHttp"

function LeftMenu() { 

  let history = useHistory();
  const dispatch = useDispatch();
  const slugParent = useSelector(state => state.slugParent)

  const changeSlug = (title, name) => dispatch(actChangeSlug(title, name));
  const disableManager = () => dispatch(actDisableManager())
  const toast = (message) => dispatch(actEnableToast(message));

  const [slugs, setSlugs] = useState([])

  useEffect(() => {
    async function getSlugs() {
      try {
        const res = await callApiHttp({
          url: `/slugs`,
          method: 'GET',
          params: {
            'type': "CHILDREN",
            'slug': slugParent.title
          }
        })
        const { data } = res
        console.log("data: ",res)
        if (res.status === 200) {
          setSlugs(data)
        }
      } catch (err) {
        if (err.response == null) {
          toast("Error Server")
          return
        }
        if (err.response.status === 401) {
          toast("Bạn không có quyền")
        }
        else if (err.response.status >= 500) {
          toast("Error Server")
        } else {
          toast(err.response.data.message)
        }
      }
    }
    getSlugs();
  }, [slugParent]);
  
  const onClickNewDetail = (title, name) => {
    disableManager()
    changeSlug(title, name)
    history.push('/news')
  }

  const genContentSlug = () => {
    return slugs.map((slug, index) => 
      <li 
        class="false" 
        id="layout_452" 
        role="presentation"
      > 
        <a 
          aria-labelledby="layout_452" 
          role="menuitem" 
          onClick={() => onClickNewDetail(slug.title, slug.name)}
          style={{cursor: 'pointer'}}
        >
          {slug.name}
        </a> 
      </li>
    )
  }

  return (
    <div class="portlet-column portlet-column-first span4 Hust_Tintuc-row2-cot1" id="column-2">
      <div class="portlet-dropzone portlet-column-content portlet-column-content-first" id="layout-column_column-2">
        <div class="portlet-boundary portlet-boundary_85_ portlet-static portlet-static-end portlet-borderless portlet-site-map " id="p_p_id_85_INSTANCE_xqR5LJMBQJTV_">
          <span id="p_85_INSTANCE_xqR5LJMBQJTV"></span>
          <div class="portlet-borderless-container" style={{}}>
            <div class="portlet-body">
              <ul>
                {genContentSlug()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftMenu;