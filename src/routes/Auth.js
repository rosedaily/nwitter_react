import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fontawesome/free-brands-svg-icons";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: {name}
    } = event;
    let provider;
    if(name === "google"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name === "github"){
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30}}
      />
      <AuthForm/>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="Github">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth