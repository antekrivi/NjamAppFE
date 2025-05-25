export interface Restoran {
    id: number;
    imeRestorana: string;
    adresa: string;
    brojTelefona: string;
    email: string;
    radnoVrijeme: Map<string, string>;
    trenutnoOtvoreno: boolean;
    prosVrijemeDostave: number;
    prosOcjenaKupca: number;
    maxBrojNarudzbi: number;
    michelinZvijezdice: number;
    kratkiOpis: string;
    postotakOpterecenosti: number;
    brojStolova: number;
    godinaOsnivanja: number;
}
