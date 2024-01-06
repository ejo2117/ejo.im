// fetches puzzle completion stats from the not-so-secret NYT API
// inspo/context from: https://github.com/kesyog/crossword


const BASE_URL='https://www.nytimes.com/svc/crosswords'
const STATS_ENDPOINT='/v3/91901606/stats-and-streaks.json'
const ENDPOINT_PARAMS='?date_start=2014-01-01&start_on_monday=true'

export async function getCrosswordData(){
    try {
        const res = await fetch(`${BASE_URL}${STATS_ENDPOINT}${ENDPOINT_PARAMS}`, {
            'method': 'GET',
            'headers': {
                'nyt-s': process.env.NYT_SUBSCRIPTION_TOKEN!
            }
        })

        if (res.ok) {
            const data = await res.json()
            return data
        }
    } catch (error) {
        console.error(error)
    }   
}