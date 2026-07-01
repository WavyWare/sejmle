type mpField = string | number | boolean;

interface columnType {
    label: string;
    compare: (guess: mpField, target: mpField) => {
        status: string,
        value: mpField,
        indicator?: string,
    }
}


export const SEJMLE_COLUMNS: columnType[] = [
    {
        label: "Imie i nazwisko",
        compare: (guess, target) => ({
                status: guess === target ? "correct" : "wrong",
                value: guess,
        })
    },
    {
        label: "Wiek",
        compare: (guess, target) => {
            if (guess === target) return {status: "correct", value: guess};
            return {
                status: "wrong",
                value: guess,
                indicator: guess > target ? "⬇️" : "⬆️"
            }
        }
    },
    {
        label: "Partia",
        compare: (guess, target) => ({
            status: guess === target ? "correct" : "wrong",
            value: guess,
        })
    },
    {
        label: "Aktywność",
        compare: (guess, target) => ({
            status: guess === target ? "correct" : "wrong",
            value: guess,
        })
    },
    {
        label: "Miejscowość",
        compare: (guess, target) => ({
            status: guess === target ? "correct" : "wrong",
            value: guess,
        })
    },
    {
        label: "Województwo",
        compare: (guess, target) => ({
            status: guess === target ? "correct" : "wrong",
            value: guess,
        })
    },
    {
        label: "Liczba głosów",
        compare: (guess, target) => {
            if (guess === target) return {status: "correct", value: guess};
            return {
                status: "wrong",
                value: guess,
                indicator: guess > target ? "⬇️" : "⬆️"
            }
        }
    },
    {
        label: "Zawód",
        compare: (guess, target) => ({
            status: guess === target ? "correct" : "wrong",
            value: guess,
        })
    },
]