import Game from "@/app/Game";
import mpsAll from '@/../public/mps-all.json';
import mpsRecognizable from '@/../public/mps-recognizable.json'
import {MP} from "@/types";
import {getDailyMP} from "@/lib/daily";

export default async function Home() {
    mpsRecognizable.sort((a: MP, b: MP) => a.fullName.localeCompare(b.fullName, 'pl'))
    mpsAll.sort((a: MP, b: MP) => a.fullName.localeCompare(b.fullName, 'pl'))



    return (
    <div className={"flex flex-col items-center justify-center my-2  "}>
        <h1 className={"text-8xl font-bold my-3 border-b-10 border-green-500"}>Sejmle</h1>
        <p className={"text-2xl"}>Wordle, ale z polskimi posłami</p>
        <div className={"my-10 flex gap-3 justify-center text-2xl"}>
        <Game mpsAll={mpsAll} dailyMP={getDailyMP(mpsRecognizable)}/>
        </div>
    </div>
  );
}

