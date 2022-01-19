import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import callApiHttp from "./callApiHttp"
import { TextField, Grid, Snackbar, Slide } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actLogin, actLoginAdmin } from './../action/index';


function SlideTransition(props) {
	return <Slide {...props} direction="up" />;
}


function Login() {
	let history = useHistory();
	const dispatch = useDispatch();
	const signin = () => dispatch(actLogin());
	const signinAdmin = () => dispatch(actLoginAdmin());

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const changeUsernameHandler = (event) => {
		setUsername(event.target.value)
	}

	const changePasswordHandler = (event) => {
		setPassword(event.target.value)
	}

	const handleClose = () => {
		setOpen(false);
	}

	async function loginProcess() {
		const res = await callApiHttp({
			url: `/auth/signin`,
			method: 'POST',
			data: {
				username,
				password
			}
		})

		const { data } = res;

		if (res.status === 200) {
			localStorage.setItem('token', data?.token)
			localStorage.setItem('user', data?.username)
			signin()
			if(data?.username === 'admin') signinAdmin()
			history.push('/add-post')
		} else {
			setErrorMessage(data);
			setOpen(true);
		}
	}

	return (
		<div style={{ marginTop: '1%' }}>
			<div className="container">
				<div className="row" >
					<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center-block">
						<legend>Đăng nhập</legend>

						<Grid container alignItems="flex-end">
							<Grid item xs={10}>
								<TextField
									label="username"
									fullWidth
									value={username}
									color="secondary"
									onChange={changeUsernameHandler} />
							</Grid>
						</Grid>
						<Grid className="mt-2" container alignItems="flex-end">
							<Grid item xs={10}>
								<TextField
									type="password"
									label="password"
									value={password}
									fullWidth
									color="secondary"
									onChange={changePasswordHandler} />
							</Grid>
						</Grid>

						<button type="submit" onClick={loginProcess} className="btn center-block" style={{ backgroundColor: "blue", cursor: 'pointer' }}>Đăng nhập</button>

						<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right',
							}}
							TransitionComponent={SlideTransition}
							open={open}
							autoHideDuration={3000}
							onClose={handleClose}
							message={errorMessage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
