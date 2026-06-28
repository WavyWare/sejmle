"use client"
import React, {useState} from 'react';
import {MP} from "@/scripts/MP";
import Image from "next/image"

import {FaLongArrowAltRight} from "react-icons/fa";

function Game(props: { mpsAll: MP[], dailyID: number}) {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState("");
    const [id, setId] = useState(0);
    const [guesses, setGuesses] = useState<number[]>([]);



    const filteredMPS = props.mpsAll.filter(mp => {
        const normalizedName = normalizeString(mp.fullName)
        const normalizedQuery = normalizeString(query)
        return normalizedName.includes(normalizedQuery)
    })

    function handleGuess() {
        setQuery("");
        if (id === 0) return;
        setGuesses([...guesses, id]);
    }

    const getMPfromID = (id: number):MP => {
        return props.mpsAll.filter(mp => mp.id === id)[0];
    }

    const todaysMP = getMPfromID(props.dailyID);

    return (
        <div className={"flex flex-col"}>
            <div className={"flex flex-row gap-3 items-center justify-center"}>
                <div>
                    <input type="text" className={"bg-zinc-900 p-3 border-3 rounded-xl border-zinc-800 outline-none focus:bg-black font-semibold min-w-175 max-w-full transition-all"} placeholder={"Wprowadź imie i nazwisko polskiego posła"} onBlur={() => setVisible(false)} onFocus={() => setVisible(true)} onChange={(e) => {
                        setQuery(e.target.value);
                    }} value={query}/>
                    <div className={"min-w-175 max-w-full absolute bg-black border-3 border-zinc-800 rounded-xl flex flex-col font-medium max-h-75 overflow-y-scroll mt-1" + (visible ? "" : " hidden")}>
                        {filteredMPS.map((mp: MP) => (
                            <div key={mp.id} className={"p-1 cursor-pointer transition-all hover:bg-zinc-900 m-1 rounded-lg flex items-center justify-between"}
                                 onMouseDown={() => {
                                     setId(mp.id)
                                     setQuery(mp.fullName)
                                 }}>
                                <div className={"text-3xl font-light"}>{mp.fullName}</div>
                                <Image src={`/members_photo/${mp.id}.webp`} alt={mp.fullName} width={50} height={62} className="object-cover rounded-lg " />
                            </div>
                        ))}
                    </div>
                </div>
                <button className={"py-2 px-6 cursor-pointer border-3 rounded-lg border-green-700 bg-green-500 font-semibold flex gap-3 items-center hover:bg-green-600 transition-all"} onClick={() => handleGuess()}>Zgadnij <FaLongArrowAltRight /></button>
            </div>
            <div className={"flex flex-col mt-10 w-[70vw] text-lg"}>
                <div className={"w-full flex flex-row bg-zinc-900 p-3 rounded-lg"}>
                    <div className={"flex-1"}>Imie i nazwisko</div>
                    <div className={"flex-1"}>Wiek</div>
                    <div className={"flex-1"}>Partia</div>
                    <div className={"flex-1"}>Aktywność</div>
                    <div className={"flex-1"}>Miejscowość</div>
                    <div className={"flex-1"}>Województwo</div>
                    <div className={"flex-1"}>Liczba głosów</div>
                    <div className={"flex-1"}>Zawód</div>
                    <div className={"flex-1"}>Zdjęcie</div>
                </div>
                {guesses.map((i, key) => {
                    const mp = getMPfromID(i);
                    const age = new Date().getFullYear() - mp.birthYear;
                    let ageIndicator;
                    if (age > new Date().getFullYear() - todaysMP.numberOfVotes) {
                        ageIndicator = "⬆️";
                    } else if (age > new Date().getFullYear() - todaysMP.numberOfVotes) {
                        ageIndicator = "⬇️";
                    } else ageIndicator = "✅";

                    return (
                        <div className={"w-full flex flex-row border-2 border-green-500 p-3 rounded-lg my-3 "} key={key}>

                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.fullName}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold " }>{age} {ageIndicator}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.club}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.active}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.districtName}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.voivodeship}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.numberOfVotes}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}>{mp.profession}</div>
                            <div className={"flex-1 flex items-center justify-center rounded-lg font-bold"}><Image alt={mp.fullName} width={50} height={62} src={`/members_photo/${mp.id}.webp`} /></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const normalizeString = (str: string) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ł/g, "l")
}



export default Game;