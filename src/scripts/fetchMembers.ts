import { writeFileSync } from 'fs';
import path from 'path';
import {MP, MPEntry} from "@/types";



async function run() {
    const res: MPEntry[] = await fetch("https://api.sejm.gov.pl/sejm/term10/MP").then((res) => res.json());

    const publicDir = path.join(process.cwd(), 'public');
    const allPath = path.join(publicDir, 'mps-all.json');
    const recognizablePath = path.join(publicDir, 'mps-recognizable.json');

    const usable: MP[] = res.map((item: MPEntry) => {
        return {
            id: item.id,
            fullName: item.firstName + " " + item.lastName,
            birthYear: parseInt(item.birthDate.split("-")[0]),
            club: item.club,
            active: item.active,
            districtName: item.districtName,
            numberOfVotes: item.numberOfVotes,
            profession: item.profession,
            voivodeship: item.voivodeship,
        }
    }).sort((a, b) => b.numberOfVotes - a.numberOfVotes)

    const sortedALl = [...new Set(usable)];

    writeFileSync(allPath, JSON.stringify(sortedALl, null, 2));

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

    const uniqueRecognizable = [...new Set(recognizable)];


    writeFileSync(recognizablePath, JSON.stringify(uniqueRecognizable, null, 2));
    console.log("Successfully saved data");
}

run()