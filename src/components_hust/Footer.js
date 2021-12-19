function Footer() {
  return (
    <div>
      <footer className="page-footer center-on-meidum-only padding-footer" style={{ marginTop: '50px' }}>
        <div className="container-fluid">
          <div className="row">

            <div className="col-lg-3 ml-auto">
              <h5 className="title">Bản đồ chỉ dẫn</h5>
              <h6>Trường đại học Bách Khoa Hà Nội</h6>
              <a href={"https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+H%C3%A0+N%E1%BB%99i/@21.0070253,105.8409473,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ac76ccab6dd7:0x55e92a5b07a97d03!8m2!3d21.0070253!4d105.843136"}>
                <img src={"/image/hust_map.jpeg"} alt="map" />
              </a>;
            </div>
            <div className="col-lg-2">
              <h5 className="title social-section-title text-center">Social Media</h5>
              <div className="social-section text-md-left">
                <ul className="text-center">
                  <li>
                    <a
                      className="btn-floating  btn-fb waves-effect waves-light"
                      href={"https://www.facebook.com/dhbkhanoi/?fref=ts"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn-floating  btn-tw waves-effect waves-light"
                      href={"https://twitter.com/DHBKHN_HUST"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="btn-floating  btn-yt waves-effect waves-light"
                      href={"https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 row">
              <div className="col-lg-6">
                <ul>
                  <li>
                    <a>{"> Viện - khoa đào tạo (A-Z)"}</a>
                  </li>
                  <li>
                    <a>{"> Viện - trung tâm nghiên cứu (A-Z)"}</a>
                  </li>
                  <li>
                    <a>{"> Phòng ban trung tâm (A-Z)"}</a>
                  </li>
                  <li>
                    <a href={"https://moet.gov.vn/Pages/home.aspx"}>{"Bộ giáo dục & đào taọ"}</a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <h5 className="title">Sơ đồ web</h5>
                <a>Xem sơ đồ trang</a>

              </div>
              <div class="w-1"></div>
              <div className="col">
                <hr className="hr" />
                <h6>Bản quyền thuộc về Trường Đại học Bách khoa Hà Nội</h6>
                <h6>Địa chỉ: Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</h6>
                <h6>Điện thoại: 024 3869 4242</h6>

              </div>
            </div>


          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
