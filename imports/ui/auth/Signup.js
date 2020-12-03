import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { AppContext } from "/imports/context";

const SIGNUP = gql`
	mutation($email: String!, $password: String!) {
		signup(email: $email, password: $password) {
			token
			user {
				email
			}
		}
	}
`;

export const Signup = () => {
	const { userData, setUserData } = useContext(AppContext);

	const [values, setValues] = useState({ email: "", password: "", errorState: "" });

	const [signUser, { loading }] = useMutation(SIGNUP, {
		onError: ({ message }) => setValues({ ...values, errorState: message }),
		onCompleted: ({ signup }) => setUserData({ ...userData, token: signup.token, user: signup.user })
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (!values.email) return setValues({ ...values, errorState: "missing-email" });
		if (!values.password) return setValues({ ...values, errorState: "missing-pwd" });

		const userData = {
			email: values.email,
			password: values.password
		};

		signUser({ variables: userData });
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Signup</h1>
			<label>
				Email Address
				<input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email Address" />
			</label>

			<label>
				Password
				<input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" />
			</label>

			{values.errorState && <p>{values.errorState}</p>}

			<button type="submit" disabled={loading}>
				{values.loading ? "Signing in" : "Sign in"}
			</button>
		</form>
	);
}