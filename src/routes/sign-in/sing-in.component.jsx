import {
  createUserDocumentFromAuth,
  singInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopUp();

    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("User created and logged in: ", userDocRef);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In With Google Pop Up</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
