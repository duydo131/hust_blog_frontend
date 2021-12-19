function Footer1(){
    return (
        <footer id="footer" role="contentinfo">
            <div id="wrapper-footer">
               <div id="wapper-title-left">
                  <div id="wapper-title-left-left">
                     <div className="bando">
                        <h4>BẢN ĐỒ CHỈ DẪN</h4>
                        <p>Trường Đại học Bách khoa Hà Nội</p>
                        <a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+H%C3%A0+N%E1%BB%99i/@21.0070516,105.840707,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ac76ccab6dd7:0x55e92a5b07a97d03!8m2!3d21.0070516!4d105.8428957"> <img src="./hust_files/bk-hn.png"/> </a> 
                     </div>
                  </div>
                  <div id="wapper-title-left-right">
                     <div className="mangxahoi">
                        <h4>MẠNG XÃ HỘI</h4>
                        <ul>
                           <li className="icon1"><a href="https://www.facebook.com/dhbkhanoi/?fref=ts"><img src="./hust_files/fb-icon.png" width="30px"/></a></li>
                           <li className="icon1"><a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg"><img src="./hust_files/ytb-icon.png" width="30px"/></a></li>
                           <li className="icon1"><a href="https://twitter.com/DHBKHN_HUST"><img src="./hust_files/twitter-icon.png" width="30px"/></a></li>
                           <ul> </ul>
                        </ul>
                     </div>
                     <div className="phanhoi"> <a href="https://www.hust.edu.vn/web/vi/lien-he"><input className="submit-phanhoi" type="submit" value="Gửi phản hồi"/></a> </div>
                  </div>
               </div>
               <div id="wapper-title-right">
                  <div id="wapper-title-top">
                     <div className="danhsachkv">
                        <p><a href="https://www.hust.edu.vn/web/vi/cac-vien-khoa-dao-tao" style={{color: '#FFF'}}>&gt; Viện - Khoa đào tạo (A - Z)</a></p>
                        <p><a href="https://www.hust.edu.vn/web/vi/trung-tam-vien-nghien-cuu1" style={{color: '#FFF'}}>&gt; Viện - Trung tâm nghiên cứu (A - Z)</a></p>
                        <p><a href="https://www.hust.edu.vn/web/vi/phong-ban-chuc-nang-trung-tam" style={{color: '#FFF'}}>&gt; Phòng - Ban - Trung tâm (A - Z)</a></p>
                        <p><a href="https://moet.gov.vn/Pages/home.aspx" target="_blank" style={{color: '#FFF'}}>Bộ Giáo dục &amp; Đào tạo</a></p>
                     </div>
                     <div className="sodoweb">
                        <h4>SƠ ĐỒ WEBSITE</h4>
                        <p><a href="https://www.hust.edu.vn/web/vi/sitemap" style={{color: '#FFF'}}>Xem sơ đồ trang ...</a></p>
                     </div>
                     <div id="wapper-title-bottom">
                        <hr/>
                        <div id="wapper-title-bottom-content">
                           <b>Bản quyền thuộc về Trường Đại học Bách khoa Hà Nội</b> 
                           <p className="address">Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</p>
                           <p className="phone">Điện thoại: 024 3869 4242</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
    )
}

export default Footer1;