import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// bring in toast when we get this in a good spot

function CreateAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let { from } = location.state || { from: { pathname: "/" } };

  const createAccount = (e) => {
    e.preventDefault();
    console.log(username, password);
    // create user obj
    const user = {
      username: username,
      password: password,
    };
    console.log(user);
    axios.post("/auth/signup", user).then((res) => {
      console.log(res);
      //displaye this message to the user using toast
    });

    navigate(from);
  };

  return (
    <div>
      <form onSubmit={createAccount}>
        <div className="form-group">
          <label>Username</label>
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
