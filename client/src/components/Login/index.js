import axios from "axios";

import styles from "./index.module.css";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/user/login",
        data,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" required={true} />
        </label>
        <label>
          Password
          <input name="password" type="password" required={true} />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}
