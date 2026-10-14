// fetches puzzle completion stats from the not-so-secret NYT API
// inspo/context from: https://github.com/kesyog/crossword

const STATE_URL = 'https://www.nytimes.com/svc/games/state/crossword_daily/latests';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type Streak = {
	current: number;
	startDate: string;
	longest: number;
};

export type NytCrosswordStats = {
	puzzlesStarted: number;
	puzzlesSolved: number;
	solveRate: number;
	dailyStreaks: Streak;
	dailyStats: Record<
		DayOfWeek,
		{
			thisWeeksDate: string;
			thisWeeksTime: number;
			totalSolveTime: number;
			totalSolves: number;
			avgTimeSeconds: number;
			best: {
				timeSeconds: number;
				date: string;
			};
			verticalStreak: Streak;
		}
	>;
};

type NytStateResponse = {
	player: {
		stats: {
			crossword_daily?: NytCrosswordStats;
		};
	};
};

export async function getCrosswordData() {
	try {
		const res = await fetch(STATE_URL, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				cookie: `NYT-S=${process.env.NYT_S_COOKIE}`,
			},
			next: {
				revalidate: 7200,
			},
		});

		if (!res.ok) {
			console.error(`NYT crossword stats request failed: ${res.status} ${res.statusText}`);
			return;
		}

		const data: NytStateResponse = await res.json();
		return data.player.stats.crossword_daily;
	} catch (error) {
		console.error(error);
	}
}
