type mpField = string | number | boolean;

interface comparisonResult {
    status: string,
    value: mpField,
    indicator?: string,
}

interface columnType {
    label: string;
    compare: (guess: mpField, target: mpField) => comparisonResult
}


export const SEJMLE_COLUMNS: columnType[] = [
    {
        label: "Imie i nazwisko",
        compare: compareExact
    },
    {
        label: "Wiek",
        compare: compareRange
    },
    {
        label: "Partia",
        compare: compareExact
    },
    {
        label: "Aktywność",
        compare: compareExact
    },
    {
        label: "Miejscowość",
        compare: compareExact
    },
    {
        label: "Województwo",
        compare: compareExact
    },
    {
        label: "Liczba głosów",
        compare: compareRange
    },
    {
        label: "Zawód",
        compare: compareExact
    },
]

function compareRange(guess: mpField, target: mpField): comparisonResult {
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