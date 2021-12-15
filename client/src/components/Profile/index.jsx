import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";
export default function Profile() {
  const [state, setState] = useState();
  const getProfile = async () => {
    const response = await axios.get("http://localhost:3002/user/profile", {
      withCredentials: true,
    });
    setState(response.data.user);
  };
  useEffect(() => {
    getProfile();
  }, []);
  console.log(state);
  return (
    <div className={styles.container}>
      <h1>Profile</h1>
      {state ? (
        <div>
          {" "}
          <p>{state.username}</p>
          <p>{state.firstname}</p>
          <p>{state.lastname}</p>
          <p>{state.email}</p>{" "}
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
