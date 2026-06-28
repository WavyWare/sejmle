import { writeFileSync } from 'fs';
import path from 'path';
import {slice} from "eslint-config-next";
import {useActionQueue} from "next/dist/client/components/use-action-queue";

type MP = {
    id: number;
    firstName: string;
    lastName: string;
    firstLastName: string;
    lastFirstName: string;
    accusativeName: string;
    genitiveName: string;
    active: boolean;
    birthDate: string;
    birthLocation: string;
    club: string;
    districtName: string;
    districtNum: number;
    educationLevel: string;
    email: string;
    numberOfVotes: number;
    profession: string;
    voivodeship: string;
};

async function run() {
    const res: MP[] = await fetch("https://api.sejm.gov.pl/sejm/term10/MP").then((res) => res.json());

    const publicDir = path.join(process.cwd(), 'public');
    const allPath = path.join(publicDir, 'mps-all.json');
    const recognizablePath = path.join(publicDir, 'mps-recognizable.json');

    const usable = res.map((item: MP) => {
        return {
            id: item.id,
            fullName: item.firstName + " " + item.lastName,
            birthYear: item.birthDate.split("-")[0],
            club: item.club,
            active: item.active,
            districtName: item.districtName,
            numberOfVotes: item.numberOfVotes,
            profession: item.profession,
            voivodeship: item.voivodeship,
        }
    }).sort((a, b) => b.numberOfVotes - a.numberOfVotes)

    writeFileSync(allPath, JSON.stringify(usable, null, 2));

    const highestKOvotes = usable.filter(mp => mp.club === "KO").slice(0, 35);
    const highestPiSvotes = usable.filter(mp => mp.club === "PiS").slice(0, 35);
    const highestLewicaVotes = usable.filter(mp => mp.club === "Konfederacja").slice(0, 10);
    const highestKonfederacjaVotes = usable.filter(mp => mp.club === "Konfederacja").slice(0, 10);
    const highestTDVotes = usable.filter(mp => mp.club.includes("TD")).slice(0, 5);
    const usedIDs = new Set([
        ...highestKOvotes.map(mp => mp.id),
        ...highestPiSvotes.map(mp => mp.id),
        ...highestLewicaVotes.map(mp => mp.id),
        ...highestKonfederacjaVotes.map(mp => mp.id),
        ...highestTDVotes.map(mp => mp.id)
    ]);
    const rest = usable
        .filter(mp => !usedIDs.has(mp.id))
        .filter(mp => mp.numberOfVotes > 30000)
        .slice(0, 5);

    const recognizable = [...highestKOvotes, ...highestPiSvotes, ...highestLewicaVotes, ...highestKonfederacjaVotes, ...highestTDVotes, ...rest].sort((a, b) => b.numberOfVotes - a.numberOfVotes);


    writeFileSync(recognizablePath, JSON.stringify(recognizable, null, 2));
    console.log("Successfully saved data");
}

run()