export interface IAction {
    type: string
    status: string
    message: string
}

export interface IUser {
    loggedIn: boolean
    userId?: number | null
    userName: string
    userLogin?: string
    sessionId?: string
    action: IAction
}

export interface IAuthData {
    login: string
    password: string
}

export interface IBook {
    assessment: number | null
    titleRus: string
    titleOrig: string
    coverImageLink: string
    authorNameOrig: string
    authorNameRus: string
    annotation: string
    readStatus: string
    comment: string
    id: number | null
    publicationYear: number | null
}

export interface IBookList {
    list: Array<IBook>
    action: IAction
}

export interface IBookForm {
    book: IBook
    action: IAction
}

