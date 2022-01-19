function PostRouter({name}) {
  return (
    <div class="portlet-layout row-fluid Hust_Tintuc-row1">
      <div class="portlet-column portlet-column-only span12 l363-row1-cot1" id="column-1">
        <div class="portlet-dropzone portlet-column-content portlet-column-content-only" id="layout-column_column-1">
          <div class="portlet-boundary portlet-boundary_1_WAR_htmlportlet_ portlet-static portlet-static-end portlet-borderless html-portlet " id="p_p_id_1_WAR_htmlportlet_INSTANCE_2qFhStvFcUvV_">
            <span id="p_1_WAR_htmlportlet_INSTANCE_2qFhStvFcUvV"></span>
            <div class="portlet-borderless-container" style={{}}>
              <div class="portlet-body">
                {/* <style type="text/css">.image-gioithieu{background:transparent url("/documents/21257/0/Gioithieu.png/0e3a9dc6-a75f-4038-a83d-06d32ffa0cde?t=1462790417000");height:65px;margin-bottom:10px;margin-top:5px}.image-gioithieu p{color:#FFF;margin-left:30px}</style> */}
                <div class="image-gioithieu">
                  <p style={{fontSize: '24px', lineHeight: '3'}}><a href="https://www.hust.edu.vn/web/vi/home" style={{color: 'rgb(255, 255, 255)', fontFamily: 'Arial', fontSize: '22px'}}>Trang chủ</a><span style={{color: 'rgb(255, 255, 255)', fontFamily: 'Arial', fontSize: '22px'}}>&nbsp;&gt;&nbsp;</span><a href="https://www.hust.edu.vn/web/vi/tin-tuc-thong-bao" style={{color: 'rgb(255, 255, 255)', fontFamily: 'Arial', fontSize: '22px'}}>Tin tức&nbsp;</a></p>
                </div>
              </div>
            </div>
          </div>
          <div class="portlet-boundary portlet-boundary_1_WAR_htmlportlet_ portlet-static portlet-static-end portlet-borderless html-portlet " id="p_p_id_1_WAR_htmlportlet_INSTANCE_NyvSIRe8od7N_">
            <span id="p_1_WAR_htmlportlet_INSTANCE_NyvSIRe8od7N"></span>
            <div class="portlet-borderless-container" style={{}}>
              <div class="portlet-body">
                <p style={{fontSize: '24px', lineHeight: '2', marginLeft: '30px'}}>{name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostRouter;