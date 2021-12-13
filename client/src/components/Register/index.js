import styles from "./index.module.css";

export default function Register() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };

    try {
      await fetch("", {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" type="text" required={true} />
        </label>
        <label>
          First Name
          <input name="firstname" type="text" required={true} />
        </label>
        <label>
          Last Name
          <input name="lastname" type="text" required={true} />
        </label>
        <label>
          Email
          <input name="email" type="email" required={true} />
        </label>
        <label>
          Password
          <input name="password" type="password" required={true} />
        </label>
        <button>Register</button>
      </form>
    </div>
  );
}
