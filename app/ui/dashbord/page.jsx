import { cards } from "../lib/data";
import Card from "../ui/dashbord/card/card";
import Chart from "../ui/dashbord/chart/chart";
import styles from "../ui/dashbord/dashbord.module.css";
import Rightbar from "../ui/dashbord/rightbar/rightbar";
import Transactions from "../ui/dashbord/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;