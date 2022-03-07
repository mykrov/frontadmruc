import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState, React } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({});

const defaultValues = {
	email: '',
	password: ''
};

function JWTLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		setValue('email', '', { shouldDirty: true, shouldValidate: true });
		setValue('password', '', { shouldDirty: true, shouldValidate: true });
	}, [reset, setValue, trigger]);

	useEffect(() => {
		if (login.errors.status === 'error') {
			dispatch(
				showMessage({
					message: `Usuario o clave incorrecta intentelo nuevamente.`,
					variant: 'error',
					autoHideDuration: 5000,
					anchorOrigin: {
						vertical: 'top', // top bottom
						horizontal: 'center' // left center right
					}
				})
			);
			// handleOpenLog();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [login.errors, setError]);

	function onSubmit(model) {
		dispatch(submitLogin(model));
	}

	return (
		<div className="w-full">
			<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							// error={!!errors.email}
							// helperText={errors?.email?.message}
							label="Usuario"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											user
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							label="Clave"
							type="password"
							// error={!!errors.password}
							// helperText={errors?.password?.message}
							variant="outlined"
							InputProps={{
								className: 'pr-2',
								type: showPassword ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword(!showPassword)}>
											<Icon className="text-20" color="action">
												{showPassword ? 'visibility' : 'visibility_off'}
											</Icon>
										</IconButton>
									</InputAdornment>
								)
							}}
							required
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOG IN"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					value="legacy"
				>
					Login
				</Button>
			</form>
		</div>
	);
}

export default JWTLoginTab;
