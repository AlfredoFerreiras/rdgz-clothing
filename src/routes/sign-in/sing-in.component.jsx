import {
  createUserDocumentFromAuth,
  singInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await singInWithGooglePopUp();

    const userDocRef = await createUserDocumentFromAuth(user);
    console.log("User created and logged in: ", userDocRef);
  };

  return (
    <div>
      <SignInForm />

      <button onClick={logGoogleUser}>Sign In With Google Pop Up</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
