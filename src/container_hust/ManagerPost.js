import ManagerLeftMenu from "../components_hust/ManagerLeftMenu";
import PostContent from "../components_hust/PostContent";
import PostRouter from "../components_hust/PostRouter";

function ManagerPost() {
	const user = localStorage.getItem('user')

	return (
		<div id="content" style={{width:'100%', display: 'inline-block'}}>
			{/* <div class="menuChildMobile"></div> */}
			<div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
			<div class="Layout12vs363" id="main-content" role="main">
				<PostRouter name={user}/>
				<div class="portlet-layout row-fluid Hust_Tintuc-row2">
					<ManagerLeftMenu />
					<PostContent kind={'MANAGER'}/>
				</div>
			</div>
		</div>
	)
}

export default ManagerPost;