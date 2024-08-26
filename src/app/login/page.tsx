import styles from "../ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      {/* <div className="bg-pink-900 color-pink-900">op</div> */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;