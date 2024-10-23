// fetches puzzle completion stats from the not-so-secret NYT API
// inspo/context from: https://github.com/kesyog/crossword

const BASE_URL = 'https://www.nytimes.com/svc/crosswords';
const STATS_ENDPOINT = '/v3/91901606/stats-and-streaks.json';
const ENDPOINT_PARAMS = '?date_start=2014-01-01&start_on_monday=true';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type NytStatsResponse = {
	results: {
		stats: {
			longest_avg_time: number;
			longest_latest_time: number;
			puzzles_attempted: number;
			puzzles_solved: number;
			solve_rate: number;
			stats_by_day: Array<{
				avg_denominator: number;
				avg_time: number;
				best_date: string;
				best_time: number;
				label: DayOfWeek;
				latest_date: string;
				latest_time: number;
				this_weeks_time: number;
			}>;
		};
		streaks: {
			current_streak: number;
			date_end: string;
			date_start: string;
			dates: Array<string[]>;
			longest_streak: number;
			vertical_streak: Array<{
				length: number;
				next_date: string;
			}>;
		};
	};
};

export async function getCrosswordData() {
	try {
		const res = await fetch(`${BASE_URL}${STATS_ENDPOINT}${ENDPOINT_PARAMS}`, {
			method: 'GET',
			headers: {
				'nyt-s': process.env.NYT_SUBSCRIPTION_TOKEN!,
			},
			next: {
				revalidate: 7200,
			},
		});

		if (res.ok) {
			const data: NytStatsResponse = await res.json();
			return data;
		}
	} catch (error) {
		console.error(error);
	}
}
