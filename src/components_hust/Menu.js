import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { actChangeSlug, actDisableManager, actChangeSlugParent, actEnableToast} from './../action/index';
import { useState, useEffect } from "react";
import callApiHttp from "./callApiHttp"

function Menu() {
  let history = useHistory();
  const dispatch = useDispatch();

  const changeSlug = (title, name) => dispatch(actChangeSlug(title, name));
  const disableManager = () => dispatch(actDisableManager())
  const toast = (message) => dispatch(actEnableToast(message));
  const changeSlugParent = (title, name) => dispatch(actChangeSlugParent(title, name))

  const [slugs, setSlugs] = useState([])

  const slugParents = [
    {
      id: 1,
      title: "tin-tuc",
      name: "Tin tức & Sự kiện"
    },
    {
      id: 2,
      title: "tin-tuc-hoc-bong",
      name: "Tin tức - Học bổng"
    },
  ]

  useEffect(() => {
    async function getSlugs() {
      try {
        const res = await callApiHttp({
          url: `/slugs`,
          method: 'GET',
          params: {
            'type': "CHILDREN",
            'slug': slugParents[0].title
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
  }, []);

  const onClickChooseSlug = (index) => {
    disableManager()
    changeSlugParent(slugParents[index].title, slugParents[index].name)
    changeSlug(slugParents[index].title, slugParents[index].name)
    history.push('/news')
  }

  const onClickNewDetail = (title, name) => {
    disableManager()
    changeSlugParent(slugParents[0].title, slugParents[0].name)
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
    <div id="menu" class="">
      <div id="home-button">
        <a href="https://www.hust.edu.vn/web/vi/home">
          <img src="/hust_files/home-button.png" style={{ height: '41px', width: '54px', zIndex: '999' }} /> </a>
      </div>
      <div id="home-text">
        <nav class="sort-pages modify-pages" id="navigation" role="navigation">
          <ul aria-label="Các trang" role="menubar">
            <li class="" id="layout_265" role="presentation">
              <a aria-labelledby="layout_265" href="https://www.hust.edu.vn/gioi-thieu" aria-haspopup="true" role="menuitem"><span> Giới thiệu</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_50" role="presentation"> <a aria-labelledby="layout_50" href="https://www.hust.edu.vn/thong-diep-cua-hieu-truong" role="menuitem">Thông điệp của Hiệu trưởng</a> </li>
                <li class="false" id="layout_31" role="presentation"> <a aria-labelledby="layout_31" href="https://www.hust.edu.vn/tong-quan" role="menuitem">Tổng quan</a> </li>
                <li class="false" id="layout_32" role="presentation"> <a aria-labelledby="layout_32" href="https://www.hust.edu.vn/co-cau-to-chuc" role="menuitem">Cơ cấu tổ chức</a> </li>
                <li class="false" id="layout_33" role="presentation"> <a aria-labelledby="layout_33" href="https://www.hust.edu.vn/ba-cong-khai" role="menuitem">Ba công khai</a> </li>
                <li class="false" id="layout_27" role="presentation"> <a aria-labelledby="layout_27" href="https://www.hust.edu.vn/media" role="menuitem">Media</a> </li>
              </ul>
            </li>
            <li class="" id="layout_189" role="presentation">
              <a aria-labelledby="layout_189" aria-haspopup="true" role="menuitem" onClick={() => onClickChooseSlug(0)} style={{cursor: 'pointer'}}><span> Tin tức &amp; Sự kiện</span></a>
              <ul class="child-menu" role="menu">
                {genContentSlug()}
                {/* <li class="false" id="layout_452" role="presentation"> <a aria-labelledby="layout_452" href="https://www.hust.edu.vn/hoatdongchung" role="menuitem">Hoạt động chung</a> </li>
                <li class="false" id="layout_192" role="presentation"> <a aria-labelledby="layout_192" href="https://www.hust.edu.vn/cong-tac-dang-doan-the" role="menuitem">Công tác Đảng và Đoàn thể</a> </li>
                <li class="false" id="layout_195" role="presentation"> <a aria-labelledby="layout_195" href="https://www.hust.edu.vn/dao-tao2" role="menuitem">Đào tạo</a> </li>
                <li class="false" id="layout_196" role="presentation"> <a aria-labelledby="layout_196" href="https://www.hust.edu.vn/khoa-hoc-cong-nghe1" role="menuitem">Khoa học - Công nghệ</a> </li>
                <li class="false" id="layout_194" role="presentation"> <a aria-labelledby="layout_194" href="https://www.hust.edu.vn/hop-tac-doi-ngoai-truyen-thong" role="menuitem">Hợp tác - Đối ngoại - Truyền thông</a> </li>
                <li class="false" id="layout_361" role="presentation"> <a aria-labelledby="layout_361" href="https://www.hust.edu.vn/to-chuc-nhan-su" role="menuitem">Tổ chức - Nhân sự</a> </li>
                <li class="false" id="layout_261" role="presentation"> <a aria-labelledby="layout_261" href="https://www.hust.edu.vn/thong-bao-moi" role="menuitem">Thông báo</a> </li>
                <li class="false" id="layout_201" role="presentation"> <a aria-labelledby="layout_201" href="https://www.hust.edu.vn/su-kien-sap-dien-ra" role="menuitem">Sự kiện sắp diễn ra</a> </li> */}
              </ul>
            </li>
            <li class="" id="layout_202" role="presentation">
              <a aria-labelledby="layout_202" href="https://www.hust.edu.vn/tuyensinh" aria-haspopup="true" role="menuitem"><span> Tuyển sinh</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_234" role="presentation"> <a aria-labelledby="layout_234" href="https://www.hust.edu.vn/dai-hoc" role="menuitem">Đại học</a> </li>
                <li class="false" id="layout_235" role="presentation"> <a aria-labelledby="layout_235" href="https://www.hust.edu.vn/cao-hoc" role="menuitem">Cao học</a> </li>
                <li class="false" id="layout_236" role="presentation"> <a aria-labelledby="layout_236" href="https://www.hust.edu.vn/nghien-cuu-sinh" role="menuitem">Nghiên cứu sinh</a> </li>
                <li class="false" id="layout_237" role="presentation"> <a aria-labelledby="layout_237" href="https://www.hust.edu.vn/vua-lam-vua-hoc" role="menuitem">Vừa làm vừa học</a> </li>
                <li class="false" id="layout_238" role="presentation"> <a aria-labelledby="layout_238" href="https://www.hust.edu.vn/van-bang-21" role="menuitem">Văn bằng 2</a> </li>
              </ul>
            </li>
            <li class="" id="layout_468" role="presentation">
              <a aria-labelledby="layout_468" href="https://www.hust.edu.vn/dao-tao" aria-haspopup="true" role="menuitem"><span> Đào tạo</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_469" role="presentation"> <a aria-labelledby="layout_469" href="https://www.hust.edu.vn/dai-hoc-chinh-quy" role="menuitem">Đại học chính quy</a> </li>
                <li class="false" id="layout_521" role="presentation"> <a aria-labelledby="layout_521" href="https://www.hust.edu.vn/chuong-trinh-elitech" role="menuitem">Đào tạo Elitech</a> </li>
                <li class="false" id="layout_485" role="presentation"> <a aria-labelledby="layout_485" href="https://www.hust.edu.vn/thac-si" role="menuitem">Thạc sĩ</a> </li>
                <li class="false" id="layout_486" role="presentation"> <a aria-labelledby="layout_486" href="https://www.hust.edu.vn/tien-si" role="menuitem">Tiến sĩ</a> </li>
                <li class="false" id="layout_487" role="presentation"> <a aria-labelledby="layout_487" href="https://www.hust.edu.vn/vua-lam-vua-hoc1" role="menuitem">Vừa làm vừa học</a> </li>
              </ul>
            </li>
            <li class="" id="layout_155" role="presentation">
              <a aria-labelledby="layout_155" href="https://www.hust.edu.vn/sinh-vien" aria-haspopup="true" role="menuitem"><span> Sinh viên</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_638" role="presentation"> <a aria-labelledby="layout_638" href="https://www.hust.edu.vn/hoc-bong-hoc-phi1" role="menuitem">Học bổng - Học phí</a> </li>
                <li class="false" id="layout_639" role="presentation"> <a aria-labelledby="layout_639" href="https://www.hust.edu.vn/ho-tro-doi-song" role="menuitem">Hỗ trợ đời sống</a> </li>
                <li class="false" id="layout_177" role="presentation"> <a aria-labelledby="layout_177" href="https://www.hust.edu.vn/huong-nghiep-viec-lam" role="menuitem">Hướng nghiệp &amp; Việc làm</a> </li>
                <li class="false" id="layout_508" role="presentation"> <a aria-labelledby="layout_508" href="https://www.hust.edu.vn/nghien-cuu-sang-tao" role="menuitem">Nghiên cứu &amp; Sáng tạo</a> </li>
                <li class="false" id="layout_640" role="presentation"> <a aria-labelledby="layout_640" href="https://www.hust.edu.vn/hoat-dong-ngoai-khoa" role="menuitem">Hoạt động ngoại khóa</a> </li>
                <li class="false" id="layout_160" role="presentation"> <a aria-labelledby="layout_160" href="https://www.hust.edu.vn/dao-tao-ky-nang" role="menuitem">Đào tạo kỹ năng</a> </li>
                <li class="false" id="layout_331" role="presentation"> <a aria-labelledby="layout_331" href="https://www.hust.edu.vn/sinh-vien-tuong-lai" role="menuitem">Sinh viên tương lai</a> </li>
                <li class="false" id="layout_162" role="presentation"> <a aria-labelledby="layout_162" href="http://alumni.hust.edu.vn/" target="," role="menuitem">Cựu sinh viên</a> </li>
                <li class="false" id="layout_378" role="presentation"> <a aria-labelledby="layout_378" href="https://www.hust.edu.vn/lien-he4" role="menuitem">Liên hệ</a> </li>
              </ul>
            </li>
            <li class="" id="layout_711" role="presentation">
              <a aria-labelledby="layout_711" href="https://www.hust.edu.vn/nghien-cuu" aria-haspopup="true" role="menuitem"><span> Nghiên cứu</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_672" role="presentation"> <a aria-labelledby="layout_672" href="https://www.hust.edu.vn/thong-tin-ung-vien-gs/pgs" role="menuitem">Thông tin ứng viên GS/PGS</a> </li>
                <li class="false" id="layout_712" role="presentation"> <a aria-labelledby="layout_712" href="https://www.hust.edu.vn/hoat-dong-nghien-cuu-khoa-hoc-va-sang-tao" role="menuitem">Hoạt động nghiên cứu khoa học và sáng tạo</a> </li>
                <li class="false" id="layout_713" role="presentation"> <a aria-labelledby="layout_713" href="https://www.hust.edu.vn/cac-don-vi-nghien-cuu" role="menuitem">Các đơn vị nghiên cứu</a> </li>
                <li class="false" id="layout_721" role="presentation"> <a aria-labelledby="layout_721" href="https://jst.hust.edu.vn/" role="menuitem">Tạp chí khoa học công nghệ</a> </li>
              </ul>
            </li>
            <li class="" id="layout_702" role="presentation">
              <a aria-labelledby="layout_702" href="https://www.hust.edu.vn/hop-tac-oi-ngoai" aria-haspopup="true" role="menuitem"><span> Hợp tác Đối ngoại</span></a>
              <ul class="child-menu" role="menu">
                <li class="false" id="layout_703" role="presentation"> <a aria-labelledby="layout_703" onClick={() => onClickChooseSlug(1)} style={{cursor: 'pointer'}} role="menuitem">Tin tức - Học bổng</a> </li>
                <li class="false" id="layout_704" role="presentation"> <a aria-labelledby="layout_704" href="https://www.hust.edu.vn/web/hop-tac-doi-ngoai/mang-luoi-doi-tac" role="menuitem">Mạng lưới đối tác</a> </li>
                <li class="false" id="layout_705" role="presentation"> <a aria-labelledby="layout_705" href="https://www.hust.edu.vn/web/hop-tac-doi-ngoai/hoat-dong-hop-tac" role="menuitem">Hoạt động hợp tác</a> </li>
              </ul>
            </li>
            <li class="" id="layout_723" role="presentation"> <a aria-labelledby="layout_723" href="https://e.hust.edu.vn/" target="_blank" role="menuitem"><span> eHust</span></a> </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Menu;