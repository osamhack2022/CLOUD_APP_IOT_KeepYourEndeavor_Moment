export type RequestLogin = {
    id: string;
    pwd: string;
}

export type ResponseLogin = {
    token: string;
}

export type RequestRegister = {
    id: string,
    pwd: string,
    class: string,
    name: string,
    authority: string;
    position: string;
    cmd: string;
    cps: string;
    division: string;
    br: string;
    bn: string;
    co: string;
    etc: string;
}