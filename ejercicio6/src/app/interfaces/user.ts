export interface User {
    _id: string,
    name: string,
    lastName: string,
    email: string,
    image: string,
    age: number
}

export interface ApiResponse {
    ok: boolean,
    result: User[],
    total?: number
}

export interface ApiResponseSingle {
    ok: boolean,
    result: User
}
