import {MP} from "@/types";

const START_DATE = new Date('2026-06-28T00:00:00Z').getTime()
export const getDailyMP = (mps: MP[]): number => {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const daysSinceStart = Math.floor((today.getTime() - START_DATE) / (1000 * 60 * 60 * 24))
    return mps[daysSinceStart % mps.length].id
}