import LeftMenu from "../components_hust/LeftMenu";
import PostRouter from "../components_hust/PostRouter";
import NewDatailContent from "../components_hust/NewDetailContent";
import ManagerLeftMenu from "../components_hust/ManagerLeftMenu";
import { useSelector } from 'react-redux';


function NewDetail() {
	const user = localStorage.getItem('user')

	const slug = useSelector(state => state.slug)
	const isManager = useSelector(state => state.manager)

	const posts = () => {
		if(isManager) return (
			<div class="Layout12vs363" id="main-content" role="main">
				<PostRouter name={user}/>
				<div class="portlet-layout row-fluid Hust_Tintuc-row2">
					<ManagerLeftMenu/>
					<NewDatailContent />
				</div>
			</div>
		)
		return (
			<div class="Layout12vs363" id="main-content" role="main">
				<PostRouter name={slug.name}/>
				<div class="portlet-layout row-fluid Hust_Tintuc-row2">
					<LeftMenu/>
					<NewDatailContent/>
				</div>
			</div>
		)
	}

	return (
		<div id="content" style={{display: 'inline-block'}}>
			<div class="menuChildMobile"></div>
			<div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
			{posts()}
		</div>
	)
}

export default NewDetail;