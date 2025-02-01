import './globals.css';
import { CenteredLayout } from '@/components/Layout';
import type { Viewport } from 'next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <CenteredLayout>{children}</CenteredLayout>;
}

export const metadata = {
	title: 'ejo',
	description: "Ethan's Homepage",
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
		{ media: '(prefers-color-scheme: dark)', color: '#171817' },
	],
};
