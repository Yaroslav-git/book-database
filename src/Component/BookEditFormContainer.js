/**
 * Компонент для редактирования книги - создания новой или изменения существующей.
 * В данном компоненте реализуется логика, в компоненте BookEditFormComponent - рендер формы редактирования.
 */
import React, {useState, useEffect} from 'react'
import {useParams, useLocation, useHistory} from "react-router-dom"
import BookEditFormComponent from './BookEditFormComponent'

const BookEditForm = (props) => {

    let history = useHistory();
    let {bookId: paramsBookId} = useParams();
    let {pathname} = useLocation();
    let [bookData, setBookData] = useState({});

    /**
     * Если через url передан идентификатор книги (bookId),
     * то через запрос к бэкэнду происходит получение данных книги.
     */
    useEffect(() => {
        if (paramsBookId !== undefined) {
            getBook(paramsBookId);
        }
        else
            setBookData({});
    }, [paramsBookId]);

    /**
     * Получение параметров книги через запрос к бэкэнду
     * @param id
     */
    const getBook = (id) => {

        let requestData = {
            action: 'get_book',
            bookId: id
        };

        props.backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    setBookData(prevState => ({
                        ...prevState,
                        ...response.data
                    }) );
                }
            },
            error => {
                if ( error.message.includes('authentication required') )
                    alert("Требуется авторизация");
                else
                    alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Создание новой книги (через запрос к бэкэнду) на основе переданных полей из формы.
     * При успешном создании книги - переход на страницу сосписком книг.
     * @param book
     */
    const createNewBook = (book) => {

        let requestData = {
            action: 'add_book',
            book: book
        };

        props.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    alert("Книга успешно добавлена");
                    history.push('/list');
                }
            },
            error => {
                if ( error.message.includes('authentication required') )
                    alert("Требуется авторизация");
                else
                    alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Изменение (обновление) данных уже существующей книги через запрос к бэкэнду
     * @param book
     */
    const updateBook = (book) => {

        let requestData = {
            action: 'update_book',
            bookId: book.id,
            book: book
        };

        props.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    alert("Книга успешно изменена");
                }
            },
            error => {
                if ( error.message.includes('authentication required') )
                    alert("Требуется авторизация");
                else
                    alert("Ошибка: "+error.message);
            }
        );
    };

    /**
     * Обработчик события отправки полей формы.
     * В зависимости от текущего url инициируется создание новой книги ('/add')
     * или обновление данных уже существующей (/edit/:bookId)
     * @param bookProps
     */
    const submitHandler = (bookProps) => {

        if ( bookProps.readStatus === '' )
            bookProps.readStatus = 'toRead';

        let actualBookData = {
            ...bookData,
            ...bookProps
        };

        setBookData(actualBookData);

        if ( pathname === '/add')
            createNewBook(actualBookData);
        else if ( pathname.includes('/edit') )
            updateBook(actualBookData);

    };


    if ( pathname.includes('/edit') && bookData.id === undefined ) {
        return (
            <div className="container">
                <div className="alert alert-info" role="alert">
                    пожалуйста, подождите. данные книги загружаются...
                </div>
            </div>
        );
    }

    return(
        <BookEditFormComponent
            book={bookData}
            submitHandler={submitHandler}
        />
    );

}

export default BookEditForm;