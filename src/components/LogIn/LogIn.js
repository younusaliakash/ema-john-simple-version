import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [newUser, setNewuser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
    error: "",
    success: false,
  });

  const [userLoggedIn, setUesrLoggedIn] = useContext(UserContext)
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const userSignIn = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(userSignIn);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFbSignUp = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var user = result.user;
        console.log(user)
      })
      .catch((error) => {
      });
  };

  const handleSignOut = () => {
    const userSignOut = {
      isSignIn: false,
      name: "",
      email: "",
      photo: "",
    };
    setUser(userSignOut);
  };

  const handleOnBlur = (event) => {
    // console.log( event.target.name ,event.target.value)
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid)
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  };
  const handleOnSubmit = (event) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
          // ...
        })
        .catch((error) => {
          // var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          // ..
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          // Signed in
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          // console.log(res.user);
          setUesrLoggedIn(newUserInfo)
          history.replace(from);
        })
        .catch((error) => {
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  const updateUserInfo = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        // Update successful.
        console.log("updated Done");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div style={{textAlign : 'center'}}>
      {user.isSignIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In With Google</button>
      )}
      <button onClick={handleFbSignUp}>Log in with Facebook</button>
      {user.isSignIn && (
        <div>
          <p>Dev Akash Authentication System Test</p>
          <p> Welcome , {user.name}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h3>Registration with Email</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          type="checkbox"
          onChange={() => setNewuser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">Create a New Account</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleOnBlur}
            placeholder="Your Name"
          />
        )}
        <br />
        <input
          type="text"
          onBlur={handleOnBlur}
          name="email"
          placeholder="Your email"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleOnBlur}
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          You have {newUser ? "create" : "Logged In"} account Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
