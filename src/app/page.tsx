'use client';
import { Poline } from 'poline';
import { useState } from 'react';
import { Body, Flex } from '@/components/ui';
import Blob from '@/components/Blob';
import { EmailBadge, GithubBadge, LinkedInBadge } from '@/components/ui/Badge/Badge';
import styles from './page.module.scss';

export default function Home() {
	const [poline, setPoline] = useState(new Poline());
	return (
		<Flex center gap={4} className={styles.mobileColumn}>
			<div className={styles.blobs} onClick={() => setPoline(new Poline())}>
				<Blob poline={poline} blurStrength={8} points={4} />
				<Blob poline={poline} radius={110} points={8} amplitude={20} />
				<Blob poline={poline} radius={60} amplitude={12} blurStrength={1} />
			</div>
			<Flex gap={4}>
				<GithubBadge />
				<LinkedInBadge />
				<EmailBadge />
			</Flex>
		</Flex>
	);
}
