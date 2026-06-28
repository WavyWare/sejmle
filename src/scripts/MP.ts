export type MPEntry = {
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

export type MP = {
    id: number;
    fullName: string;
    birthYear: number;
    club: string;
    active: boolean;
    districtName: string;
    numberOfVotes: number;
    profession?: string | undefined;
    voivodeship: string;
}