'use client';
import React from 'react';
import { Inter } from 'next/font/google';
import { LOREM } from '@/utils/constants';
import { Badge, Body, Flex, Heading, Title } from '../index';
import { FigmaBadge, SkillBadges } from '../Badge/Badge';
import styles from './Cell.module.scss';
const inter = Inter({ subsets: ['latin'] });

type CellProps = {
	jobTitle: string;
	company: string;
	dates: string;
	description: string;
	skills: (keyof typeof SkillBadges)[];
};

const Cell = ({ jobTitle, company, dates, description, skills }: CellProps) => {
	return (
		<Flex column className={styles.container} pad={4} position='relative'>
			<Flex justify='between' align='end' className={styles.header}>
				<Flex column gap={1}>
					<Title>{jobTitle}</Title>
					<Body italic>{company}</Body>
				</Flex>
				<Body italic>{dates}</Body>
			</Flex>
			<Body>{description}</Body>
			<Flex column gap={2}>
				<Body bold>I used: </Body>
				<Flex gap={4}>{skills.map(skill => SkillBadges[skill]())}</Flex>
			</Flex>
		</Flex>
	);
};

export default Cell;
