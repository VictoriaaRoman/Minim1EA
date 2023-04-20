export interface Localizacion {
    _id?:           ID;
    name:           string;
    localizacion:   string;
    veces:          number;
    ticket?:        number;
    createdAt?:     AtedAt;
    updatedAt?:     AtedAt;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: DateClass;
}

export interface DateClass {
    $numberLong: string;
}
