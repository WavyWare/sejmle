"use client"
import React, {useState} from 'react';
import {MP} from "@/types";
import Image from "next/image"

import {FaLongArrowAltRight} from "react-icons/fa";
import {normalizeString} from "@/lib/normalize";
import {SEJMLE_COLUMNS} from "@/lib/compare";

function Game(props: { mpsAll: MP[], dailyMP: MP}) {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedMP, setSelectedMP] = useState<MP | null>(null);
    const [guesses, setGuesses] = useState<MP[]>([]);

    const filteredMPS = props.mpsAll.filter(mp => {
        const normalizedName = normalizeString(mp.fullName)
        const normalizedQuery = normalizeString(query)
        return normalizedName.includes(normalizedQuery)
    })

    function handleGuess() {
        setQuery("");
        if (!selectedMP) return;
        if (guesses.some((g) => g.id === selectedMP.id)) return;
        setGuesses([...guesses, selectedMP]);
    }

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
                                     setSelectedMP(mp)
                                     setQuery(mp.fullName)
                                 }}>
                                <div className={"text-3xl font-light"}>{mp.fullName}</div>
                                <Image src={`/members_photo/${mp.id}.webp`} alt={mp.fullName} width={50} height={62} className="object-cover rounded-xl " />
                            </div>
                        ))}
                    </div>
                </div>
                <button className={"py-2 px-6 cursor-pointer border-3 rounded-xl border-green-700 bg-green-500 font-semibold flex gap-3 items-center hover:bg-green-600 transition-all"} onClick={() => handleGuess()}>Zgadnij <FaLongArrowAltRight /></button>
            </div>
            <div className={"flex flex-col-reverse gap-2 mt-18 w-[70vw] text-lg"}>
                <div className={"grid grid-cols-9 text-center bg-zinc-900 p-3 border-3 border-zinc-800 rounded-xl order-1"}>
                    <div>Zdjęcie</div>
                    {SEJMLE_COLUMNS.map((elem, index) => (
                        <div key={index}>
                            {elem.label}
                        </div>
                    ))}
                </div>
                    {guesses.map((guess) => {
                        return (
                            <div className={"grid grid-cols-9 text-center border-3 border-zinc-800 rounded-xl h-32"} key={guess.id}>
                                <div className={"flex items-center mx-auto"}>
                                    <Image src={`/members_photo/${guess.id}.webp`} alt={guess.fullName} width={50} height={62} className="rounded-xl "/>
                                </div>
                                {SEJMLE_COLUMNS.map((col, index) => {
                                    const comparison = col.compare(guess[col.key], props.dailyMP[col.key])
                                    return (
                                        <div key={index} className={"flex items-center justify-center text-center p-3 min-h-24 " + (comparison.status === "correct" ? "bg-green-500 text-black font-bold" : "")}>
                                            <span className="line-clamp-3">
                                                {comparison.value}
                                            </span>
                                            {comparison.indicator ?? ""}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}



export default Game;