/**
 * Компонент для редактирования книги - создания новой или изменения существующей.
 * В данном компоненте реализуется логика, в компоненте BookEditFormComponent - рендер формы редактирования.
 */
import React, {useEffect} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import BookEditFormComponent from './BookEditFormComponent';
import {getBook, updateBook, createBook, clearBookData, removeBook} from '../store/bookEditForm/actions';

const BookEditForm = (props) => {

    let history = useHistory();
    let {bookId: paramsBookId} = useParams();
    let {pathname} = useLocation();

    /**
     * Если через url передан идентификатор книги (bookId),
     * то происходит получение данных книги через API.
     */
    useEffect(() => {
        if (paramsBookId !== undefined) {
            props.getBook(paramsBookId);
        }
        else {
            props.clearBookData();
        }
    }, [paramsBookId]);

    /**
     * Обработка изменений статусов запрошенных действий
     */
    useEffect(() => {

        if ( props.action.message === 'authentication required' ) {
            alert('Требуется аутентификация');
            history.push('/logIn');
            return;
        }

        switch(props.action.type){
            case 'get_book':
                if ( props.action.status === 'error' ) {
                    alert('Ошибка при получении данных книги');
                    console.log(props.action.message);
                }
                break;
            case 'create_book':
                if ( props.action.status === 'error' ) {
                    alert('Ошибка при создании книги');
                    console.log(props.action.message);
                }
                if ( props.action.status === 'success' ) {
                    alert('Книга успешно создана');
                    history.push('/edit/'+props.book.id);
                }
                break;
            case 'update_book':
                if ( props.action.status === 'error' ) {
                    alert('Ошибка при сохранении изменений');
                    console.log(props.action.message);
                }
                if ( props.action.status === 'success' ) {
                    alert('Изменения успешно сохранены');
                    console.log(props.action.message);
                }
                break;
            case 'remove_book':
                if ( props.action.status === 'error' ) {
                    alert('Ошибка при удалении');
                    console.log(props.action.message);
                }
                if ( props.action.status === 'success' ) {
                    alert('Книга удалена');
                    history.push('/add');
                }
                break;
        }
    }, [props.action.type, props.action.status, props.action.message]);


    /**
     * Обработчик события отправки полей формы.
     * В зависимости от текущего url инициируется создание новой книги ('/add')
     * или обновление данных уже существующей (/edit/:bookId)
     * @param bookData
     */
    const editBook = (bookData) => {

        if ( bookData.readStatus === '' )
            bookData.readStatus = 'To read';

        let actualBookData = {
            ...props.book,
            ...bookData
        };

        if ( pathname.includes('/edit') )
            props.updateBook(actualBookData);
        else if ( pathname === '/add')
            props.createBook(actualBookData);
    };

    /**
     * При загрузке данных книги вывести оповещение
     */
    if ( props.action.type === 'get_book' && props.action.status === 'pending' ) {
        return (
            <div className="container book-edit-control">
                <div className="alert alert-info" role="alert">
                    пожалуйста, подождите. данные книги загружаются...
                </div>
            </div>
        );
    }

    return(
        <BookEditFormComponent
            book={props.book}
            submitHandler={editBook}
            removeHandler={props.book.id && props.removeBook}
        />
    );

};

const mapStateToProps = state => {
    return {
        book: state.bookEditForm.bookData,
        action: state.bookEditForm.action
    };
};

const mapDispatchToProps = {
    getBook,
    updateBook,
    createBook,
    clearBookData,
    removeBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookEditForm);