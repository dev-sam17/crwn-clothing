import { useState } from "react";
import {
  signInWithGooglePopup,
  authUserSignInWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./signin-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetForm = () => {
        setFormFields(defaultFormFields);
    };

    try {
        const { user } = await authUserSignInWithEmailAndPassword(email, password);
        if(user.uid) {
            alert('Login successful');
        }
        resetForm();
    } catch (error) {
        if ( error.code === 'auth/invalid-credential') {
            alert('Either email or password is incorrect. Please try again.');
        }
        else {
            console.log(error);
        }
    }
  }

  const logGoogleUser = async () => {
    try {
        await signInWithGooglePopup(); 
        alert('Login with Google successful');
    } catch (error) {
        if ( error.code === 'auth/popup-closed-by-user'  || error.code === 'auth/popup-blocked') {
            alert('Unable to login with Google. Popup closed by user or popup is blocked by user. Please enable popup for this site.');
        }
        else {
            console.log(error);
        }
    };
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Signin</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button children="Sign In" type="Submit" />
          <Button onClick={logGoogleUser} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
