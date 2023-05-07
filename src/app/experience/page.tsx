import Cell from "@/components/ui/Cell";
import { Caption, Flex } from "@/components/ui";
import {
  FigmaBadge,
  GraphQlBadge,
  NextJsBadge,
  ReactBadge,
  ShopifyBadge,
  TypescriptBadge,
} from "@/components/ui/Badge/Badge";
import styles from "./page.module.scss";

type JobProps = {
  title: string;
  company: string;
  dates: string;
};

const Job = ({ title, company, dates }: JobProps) => {
  return (
    <li>
      <Caption>{title}</Caption>
      <Caption className={styles.desktop}> - </Caption>
      <div className={styles.details}>
        <Caption>
          <i>{company}</i>
        </Caption>
        <Caption>{dates}</Caption>
      </div>
    </li>
  );
};

export default function Resume() {
  const jobs = [
    {
      title: "Full Stack Developer",
      company: "Pair Eyewear",
      dates: "2020 - Present",
    },
    {
      title: "UI/UX Intern",
      company: "Pair Eyewear",
      dates: "2020 - 2020",
    },
    {
      title: "Co-Owner, Product Developer",
      company: "Sight",
      dates: "2018 - 2020",
    },
    {
      title: "Barista",
      company: "Pret a Manger",
      dates: "2018 - 2018",
    },
  ];

  return (
    <ul className={styles.container}>
      {jobs.map((props) => (
        <Job key={props.title} {...props} />
      ))}
    </ul>
  );
}
