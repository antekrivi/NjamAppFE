export interface RestoranDTO {
    id: number;
    imeRestorana: string;
    adresa: string;
    trenutnoOtvoreno: boolean;
    postotakOpterecenosti: number;
    michelinZvijezdice: number;
    radnoVrijeme: Map<string, string>;
    brojStolova: number;
    godinaOsnivanja: number;
}