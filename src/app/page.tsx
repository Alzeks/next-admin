import Link from "next/link";
import styles from "../app/ui/dashbord/dashbord.module.css";

const Homepage = () => {

  return (
    <div className={styles.maincontainer}>
      <h1 className=''>Homepage</h1>
      <Link href='/login' className={styles.mainblock}>To Login</Link>
      <Link href='/dashboard' className={styles.mainblock}>To Dashboard</Link>
    </div>
  )
}
export default Homepage;
