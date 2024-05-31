export interface IResponse<data> {
    data?: data,
    errors?: string[],
    msg?: string,
    r: boolean
}

/* export interface IResponse {
    data: any,
    errors?: string[],
    r: boolean
}

export interface IResponseAction {
    errors?: string[],
    msg?: string,
    r: boolean
} */