import PostRouter from "../components_hust/PostRouter";
import ManagerLeftMenu from "../components_hust/ManagerLeftMenu";
import Register from "../components_hust/Register";
import RegisterSuccess from "../components_hust/RegisterSuccess"
import { useState } from "react";


function NewDetail() {
	const user = localStorage.getItem('user')

	const [success, setSuccess] = useState(false)
	const [email ,setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const onSuccess = (email, username, password) => {
		setSuccess(true)
		setEmail(email)
		setUsername(username)
		setPassword(password)
	}

	const gen = () => {
		if(!success) return
		return <RegisterSuccess email={email} username={username} password={password}/>
	}

	return (
		<div id="content" style={{display: 'inline-block', width: '100%', marginBottom: '10%'}}>
			<div class="menuChildMobile"></div>
			<div id="icon-bar"> <a href="https://www.facebook.com/dhbkhanoi/?fref=ts" target="_blank" class="facebook"><i class="fa fa-facebook"></i></a> <a href="https://www.youtube.com/channel/UCILDWZ7oJhUcvWrYrRtLzVg/videos" class="youtube"><i class="fa fa-youtube"></i></a> <a href="https://www.linkedin.com/school/dhbkhn/" class="linkedin"><i class="fa fa-linkedin"></i></a> <a href="https://www.instagram.com/hust_dhbkhanoi/" class="instagram"><i class="fa fa-instagram"></i></a> <a href="https://twitter.com/DHBKHN_HUST" class="twitter"><i class="fa fa-twitter"></i></a> </div>
			<div class="Layout12vs363" id="main-content" role="main" >
				<PostRouter name={user}/>
				<div class="portlet-layout row-fluid Hust_Tintuc-row2">
					<ManagerLeftMenu/>
					<Register onSuccess={onSuccess}/>
					{gen()}
				</div>
			</div>
		</div>
	)
}

export default NewDetail;