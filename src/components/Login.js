import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { auth } from '../firebase';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function SignIn() {
	const classes = useStyles();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			console.log(result);
			alert('Login successfully');
			history.push('/');
		} catch (error) {
			alert(error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOpenIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					<TextField
						type="email"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Email Address"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						type="password"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						autoComplete="current-password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>

					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						Login
					</Button>

					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/signup" variant="body2">
								Don't Have an Account? Signup
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
