import { ReactElement } from 'react';
import Cell from '@/components/ui/Cell';
import { Caption, Flex } from '@/components/ui';
import { FigmaBadge, GraphQlBadge, NextJsBadge, ReactBadge, ShopifyBadge, TypescriptBadge } from '@/components/ui/Badge/Badge';
import { OffsetLayout } from '@/components/Layout';
import styles from './page.module.scss';

type JobProps = {
	title: string;
	company: string;
	dates: string;
};

const Job = ({ title, company, dates }: JobProps) => {
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
	const jobs = [
		{
			title: 'Senior Software Engineer',
			company: 'Rivian',
			dates: 'Present',
		},
		{
			title: 'Founding Engineer',
			company: 'Pair Eyewear',
			dates: '2020 - 2024',
		},
		{
			title: 'Co-Owner, Product Developer',
			company: 'Sight',
			dates: '2018 - 2020',
		},
		{
			title: 'Barista',
			company: 'Pret a Manger',
			dates: '2018 - 2018',
		},
	];

	return (
		<ul className={styles.container}>
			{jobs.map(props => (
				<Job key={props.title} {...props} />
			))}
		</ul>
	);
}

Resume.getLayout = function getLayout(page: ReactElement) {
	return <OffsetLayout>{page}</OffsetLayout>;
};
