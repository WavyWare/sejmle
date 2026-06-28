import Game from "@/app/Game";
import mpsAll from '@/../public/mps-all.json';
import mpsRecognizable from '@/../public/mps-recognizable.json'
import {MP} from "@/scripts/MP";

export default async function Home() {
    mpsRecognizable.sort((a: MP, b: MP) => a.fullName.localeCompare(b.fullName, 'pl'))
    mpsAll.sort((a: MP, b: MP) => a.fullName.localeCompare(b.fullName, 'pl'))

    const START_DATE = new Date('2026-06-28T00:00:00Z').getTime()
    const getDailyMP = (mps: MP[]): number => {
        const today = new Date()
        today.setUTCHours(0, 0, 0, 0)
        const daysSinceStart = Math.floor((today.getTime() - START_DATE) / (1000 * 60 * 60 * 24))
        return mps[daysSinceStart % mps.length].id
    }

    return (
    <div className={"flex flex-col items-center justify-center my-2  "}>
        <h1 className={"text-8xl font-bold my-3 border-b-10 border-green-500"}>Sejmle</h1>
        <p className={"text-2xl"}>Wordle, ale z polskimi posłami</p>
        <div className={"my-10 flex gap-3 justify-center text-2xl"}>
        <Game mpsAll={mpsAll} dailyID={getDailyMP(mpsRecognizable)}/>
        </div>
    </div>
  );
}

