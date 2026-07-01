import {MP} from "@/types";

type mpField = string | number | boolean | undefined;

interface comparisonResult {
    status: string,
    value: mpField,
    indicator?: string,
}

interface columnType {
    key: keyof MP,
    label: string;
    compare: (guess: mpField, target: mpField) => comparisonResult
}


export const SEJMLE_COLUMNS: columnType[] = [
    {
        key: "fullName",
        label: "Imie i nazwisko",
        compare: compareExact
    },
    {
        key: "age",
        label: "Wiek",
        compare: compareRange
    },
    {
        key: "club",
        label: "Partia",
        compare: compareExact
    },
    {
        key: "active",
        label: "Aktywność",
        compare: (guess: mpField, target: mpField): comparisonResult => {
        return {
            status: guess === target ? "correct" : "wrong",
            value: guess ? "Aktywny" : "Nieaktywny"
        }}
    },
    {
        key: "districtName",
        label: "Miejscowość",
        compare: compareExact
    },
    {
        key: "voivodeship",
        label: "Województwo",
        compare: compareExact
    },
    {
        key: "numberOfVotes",
        label: "Liczba głosów",
        compare: compareRange
    },
    {
        key: "profession",
        label: "Zawód",
        compare: compareExact
    },
]

function compareRange(guess: mpField, target: mpField): comparisonResult {
    if (!guess || !target) return {status: "wrong", value: "Niepoprawne dane"}
    if (guess === target) return {status: "correct", value: guess};
    return {
        status: "wrong",
        value: guess,
        indicator: guess > target ? "⬇️" : "⬆️"
    }
}

function compareExact(guess: mpField, target: mpField): comparisonResult {
    return {
        status: guess === target ? "correct" : "wrong",
        value: guess,
    }
}