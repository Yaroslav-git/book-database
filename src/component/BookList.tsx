/**
 * Компонент для получения, обновления и вывода списка книг пользователя.
 * Книги представлены в виде карточек (Card) - компонент BookCard.
 */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getBookList, removeBook, clearActionData} from '../store/bookList/actions';
import BookCard from './BookCard'
import {IBook, IBookList} from './interfaces'

interface IBookListProps extends IBookList {
    getBookList: () => void
    removeBook: (id: number) => void
    clearActionData: () => void
}

interface IStateBookList {
    bookList: IBookList
}

const BookList: React.FC<IBookListProps> = (props) => {

    let [bookCardList, setBookCardList] = useState<JSX.Element[]>([]);
    let [alertMessage, setAlert] = useState<string>('');

    /**
     * Получение списка книг пользователя при создании компонента
     */
    useEffect(() => {
        props.getBookList();
    }, []);

    /**
     * Создание массива компонентов BookCard из массива данных (списка книг) из store
     */
    useEffect(() => {
        let list: JSX.Element[] = props.list.map((book: IBook) =>
            <div key={book.id} className="col-sm-6 col-md-4 col-lg-4">
                <BookCard data={book} removeHandler={removeHandler} />
            </div>
        );
        setBookCardList(list);
    }, [props.list]);

    /**
     * Обработка изменений статусов запрошенных действий
     */
    useEffect(() => {
        switch(props.action.type){
            case 'get_book_list':
                if ( props.action.status === 'error' ) {
                    console.log(props.action.message);
                    setAlert('Ошибка при получении списка книг пользователя');
                }
                if ( props.action.status === 'pending' ) {
                    setAlert('Список книг загружается...');
                }
                if ( props.action.status === 'success' ) {
                    if ( props.list.length > 0 )
                        setAlert('');
                    else
                        setAlert('Список книг пуст');
                }
                break;
            case 'remove_book':
                console.log('remove_book props', props);
                if ( props.action.status === 'error' ) {
                    alert('Ошибка при удалении книги');
                    console.log(props.action.message);
                }
                if ( props.action.status === 'success' ) {
                    alert('Книга удалена');
                }
                props.clearActionData();
                break;
        }
    }, [props.action.type, props.action.status, props.action.message]);

    const removeHandler = (id: number) => {
        const shouldRemove = window.confirm('Вы уверены, что хотите удалить элемент?')
        if (shouldRemove) {
            props.removeBook(id)
        }
    };

    /**
     * При наличии непустого оповещения - вывести его
     */
    if ( alertMessage !== '' ) {
        return (
            <div className="album py-5">
                <div className="container-fluid">
                    <div className={'alert alert-'+(props.action.status === 'error' ? 'danger' : 'info')} role="alert">
                        {alertMessage}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Иначе (при пустом оповещении) вывести спиок компонентов BookCard
     */
    return (
        <div className="album py-5">
            <div className="container-fluid">
                <div className="row">
                    {bookCardList}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IStateBookList) => {
    return {
        list: state.bookList.list,
        action: state.bookList.action
    };
};

export default connect(mapStateToProps, {getBookList, removeBook, clearActionData})(BookList);