import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        // ? Sign in successful
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          password: "",
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch((err) => {
        // ! Error Handling
        console.log(err);
        console.log(err.message);
        document.write(err.message);
      });
  };

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        console.log("fb user after sign in", user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
      });
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .then((res) => {
          // * Success Message
          const userInfo = { ...user };
          userInfo.message = (
            <h3 style={{ color: "green" }}>
              Congratulations! Account is Created
            </h3>
          );
          setUser(userInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const userInfo = { ...user };
          userInfo.message = <h3 style={{ color: "red" }}>{errorMessage}</h3>;
          setUser(userInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const userInfo = { ...user };
          userInfo.message = (
            <h3 style={{ color: "green" }}>Account Logged In Successfully</h3>
          );
          setUser(userInfo);
          setLoggedInUser(userInfo);
          history.replace(from);
          console.log("sign in in user info", res.user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const userInfo = { ...user };
          userInfo.message = <h3 style={{ color: "red" }}>{errorMessage}</h3>;
          setUser(userInfo);
        });
    }
    e.preventDefault();
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    } else if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      const passwordHasSpecialCharacter = /\W|_/g.test(e.target.value);
      isFieldValid =
        isPasswordValid && passwordHasNumber && passwordHasSpecialCharacter;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        // Update successful.
        console.log("User name updated successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleSignIn}>Sign In</button>
      {user.isSignedIn && (
        <div className="user-div">
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <br />
      <button onClick={handleFbSignIn}>Facebook Login</button>

      <h1>Our Own Authentication System</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User ? Click Here</label>
      <form onSubmit={handleSubmit}>
        <br />
        {newUser && <input type="text" placeholder="Your name..." />}
        <br />
        <input
          type="text"
          onBlur={handleBlur}
          name="email"
          placeholder="Email Address..."
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Password..."
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <br />
      <h3>{user.message}</h3>
    </div>
  );
}
export default Login;
