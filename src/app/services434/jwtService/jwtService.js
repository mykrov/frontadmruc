// eslint-disable-next-line
import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = async (email, password) => {
		let errors = [];
		let users;
		const serverapi = process.env.REACT_APP_SERVERAPI;
		return new Promise((resolve, reject) => {
			// eslint-disable-next-line
			axios.post(`${serverapi}/login`, { user: email, password: password }).then(response => {
				if (response.data.status === 'ok') {
					users = [
						{
							uuid: response.data.data.CODIGO,
							from: 'custom-db',
							password: '',
							role: 'ADMIN',
							data: {
								displayName: response.data.data.NOMBRE,
								photoURL: 'assets/images/avatars/Abbott.jpg',
								email: response.data.data.CODIGO,
								settings: {
									layout: {
										style: 'layout1',
										config: {
											scroll: 'content',
											navbar: {
												display: true,
												folded: true,
												position: 'left'
											},
											toolbar: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											footer: {
												display: true,
												style: 'fixed',
												position: 'below'
											},
											mode: 'fullwidth'
										}
									},
									customScrollbars: true,
									theme: {
										main: 'default',
										navbar: 'light5',
										toolbar: 'mainThemeLight',
										footer: 'mainThemeDark'
									}
								}
								// shortcuts: ["calendar", "mail", "contacts"],
							}
						}
					];
					this.setSession(response.data.accesstoken);
					resolve(users);
				} else {
					errors = response.data;
					reject(errors);
				}
			});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth/access-token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
