import { Caption } from "@/components/ui";
import styles from "./page.module.scss";
import roles from "../../components/sections/Experience/roles";

type RoleProps = {
  title: string;
  company: string;
  dates: string;
};

const Role = ({ title, company, dates }: RoleProps) => {
  return (
    <li>
      <div className={styles.details}>
        <Caption className={styles.mobile}>{`${title},`}</Caption>
        <Caption className={styles.desktop}>{title}</Caption>
        <Caption className={styles.desktop}> - </Caption>
        <Caption>
          <i>{company}</i>
        </Caption>
      </div>
      <Caption>{dates}</Caption>
    </li>
  );
};

export default function Resume() {
  return (
    <ul className={styles.container}>
      {roles.map((props) => (
        <Role key={props.title} {...props} />
      ))}
    </ul>
  );
}
