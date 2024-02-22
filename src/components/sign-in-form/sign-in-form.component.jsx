import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          const userCre = userCredentials.user;
          console.log(userCre);
        }
      );
      resetFormFields();
    } catch (error) {
      console.log(error.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h2>Have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleLogin}>
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

        <Button buttonType="inverted" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
