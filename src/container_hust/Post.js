import LeftMenu from "../components_hust/LeftMenu";
import PostContent from "../components_hust/PostContent";
import PostRouter from "../components_hust/PostRouter";
import { useSelector } from 'react-redux';

function Post() {
	const slug = useSelector(state => state.slug)
	return (
		<div id="content" style={{display: 'inline-block', width:'100%'}}>
			<div class="menuChildMobile"></div>
			<div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
			<div class="Layout12vs363" id="main-content" role="main">
				<PostRouter name={slug.name}/>
				<div class="portlet-layout row-fluid Hust_Tintuc-row2">
					<LeftMenu />
					<PostContent kind={'USER'}/>
				</div>
			</div>
		</div>
	)
}

export default Post;