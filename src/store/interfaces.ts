export interface IApiUser {
    id: number
    login: string
    name: string
}

export interface IApiSession {
    id: number
    login: string
    name: string
    isValid: boolean,
    userId: number,
    userLogin: string,
    userName: string,
    sessionId: string,
    sessionStart: number,
    sessionEnd: number
}

export interface IApiBook {
    id: number
    assessment: number | null
    titleRus: string
    titleOrig: string
    coverImageLink: string
    authorNameOrig: string
    authorNameRus: string
    annotation: string
    readStatus: string
    comment: string
    publicationYear: number
    insertedAt: number
    updatedAt: number
}

export interface IApiBookCreate {
    bookId: number
}

export interface IError {
    message?: string
}

export interface IApiState {
    //provider: (requestType: string, path: string, requestData?: any) => Promise<{}>
    provider: (requestType: string, path: string, requestData?: any) => Promise<any>
}

export interface IBookListAction {
    type: BookListActionTypes
    payload?: any
}

export interface IUserAction {
    type: UserActionTypes
    payload?: any
}

export interface IBookEditAction {
    type: BookEditActionTypes
    payload?: any
}

export enum BookListActionTypes {
    GET_BOOK_LIST_REQUEST = 'GET_BOOK_LIST_REQUEST',
    GET_BOOK_LIST_SUCCESS = 'GET_BOOK_LIST_SUCCESS',
    GET_BOOK_LIST_FAIL = 'GET_BOOK_LIST_FAIL',
    REMOVE_LIST_BOOK_REQUEST = 'REMOVE_LIST_BOOK_REQUEST',
    REMOVE_LIST_BOOK_SUCCESS = 'REMOVE_LIST_BOOK_SUCCESS',
    REMOVE_LIST_BOOK_FAIL = 'REMOVE_LIST_BOOK_FAIL',
    CLEAR_ACTION_DATA = 'CLEAR_ACTION_DATA'
}

export enum UserActionTypes {
    LOG_IN_REQUEST = 'LOG_IN_REQUEST',
    LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
    LOG_IN_FAIL = 'LOG_IN_FAIL',
    VALIDATE_SESSION_REQUEST = 'VALIDATE_SESSION_REQUEST',
    VALIDATE_SESSION_SUCCESS = 'VALIDATE_SESSION_SUCCESS',
    VALIDATE_SESSION_FAIL = 'VALIDATE_SESSION_FAIL',
    LOG_OUT_REQUEST = 'LOG_OUT_REQUEST',
    LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
    LOG_OUT_FAIL = 'LOG_OUT_FAIL'
}

export enum BookEditActionTypes {
    GET_BOOK_REQUEST = 'GET_BOOK_REQUEST',
    GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS',
    GET_BOOK_FAIL = 'GET_BOOK_FAIL',
    CLEAR_BOOK_DATA = 'CLEAR_BOOK_DATA',
    CREATE_BOOK_REQUEST = 'CREATE_BOOK_REQUEST',
    CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS',
    CREATE_BOOK_FAIL = 'CREATE_BOOK_FAIL',
    UPDATE_BOOK_REQUEST = 'UPDATE_BOOK_REQUEST',
    UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS',
    UPDATE_BOOK_FAIL = 'UPDATE_BOOK_FAIL',
    REMOVE_BOOK_REQUEST = 'REMOVE_BOOK_REQUEST',
    REMOVE_BOOK_SUCCESS = 'REMOVE_BOOK_SUCCESS',
    REMOVE_BOOK_FAIL = 'REMOVE_BOOK_FAIL'
}

