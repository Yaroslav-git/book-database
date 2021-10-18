/**
 * Компонент для вывода формы редактирования книги.
 * Для отображения текущего результата заполнения полей (в виде карточки книги) используется компонент BookCard.
 */
import React, {useState, useEffect} from 'react'
import BookCard from './BookCard'
import '../css/BookEditForm.css'

const BookEditFormComponent = (props) => {

    let [book, setBook] = useState({
        titleOrig: "",
        titleRus: "",
        authorNameOrig: "",
        authorNameRus: "",
        publicationYear: "",
        coverImageLink: "",
        annotation: "",
        comment: "",
        readStatus: "",
        assessment: ""
    });

    // обязательные для заполнения поля
    let requiredFields = ['titleRus','authorNameRus','publicationYear'];
    // незаполненные поля
    let [invalidFields, setInvalidFields] = useState([]);

    useEffect( () => {
        if ( props.book )
            setBook(props.book);
    }, [props.book]);

    /**
     * Обработчик изменения полей формы создания/изменения книги.
     * @param event
     */
    const handleChange = (event) => {
        let {name, type, value, checked} = event.target;

        if ( name === 'assessment' )
            value = +value;

        let invalidFieldIndex = invalidFields.indexOf(name);
        if ( invalidFieldIndex >= 0 ){
            delete invalidFields[invalidFieldIndex];
            setInvalidFields(invalidFields);
        }
        
        setBook( prevState => ({
            ...prevState,
            [name]: (type === 'checkbox' ? checked : value)
        }) );

        if ( name === 'readStatus' && value !== 'Has been read' ) {
            setBook( prevState => ({
                ...prevState,
                assessment: ''
            }) );
        }
    };

    /**
     * Обработчик события отправки полей формы.
     * Если все обязательные поля заполнены, данные передаются в функцию submitHandler
     * из компонента-контейнера BookEditForm.
     *
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        let invalidFields = validateRequiredFields();
        setInvalidFields(invalidFields);

        if ( invalidFields.length > 0 )
            alert('Не заполнены обязательные поля');
        else
            props.submitHandler(book);
    };

    /**
     * Проверка корректного заполнения обязательных полей
     *
     * @returns {Array.<string>}
     */
    const validateRequiredFields = () => {

        return requiredFields.filter( name => (
             !book.hasOwnProperty(name)
             || book[name] === ''
             || book[name] === undefined
             || ( name === 'publicationYear' && !Number.isInteger(+book[name]) )
            )
         );
    };

    return (
        <div className="container-fluid book-edit-control">
            <div className="row">
                <div className="col-md-6 col-lg-6 offset-md-1 offset-lg-1">

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Название книги
                                    <input type="text" name="titleRus" placeholder="Назване книги на русском"
                                           className={'form-control' + (invalidFields.includes('titleRus') ? ' is-invalid' : '')}
                                           value={book.titleRus ? book.titleRus : ''} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Название в оригинале
                                    <input type="text" className="form-control" name="titleOrig"
                                           value={book.titleOrig ? book.titleOrig : ''} onChange={handleChange}
                                           placeholder="Original book title"/>
                                </label>
                            </div>
                            <div className="form-group col-md-2 col-lg-2">
                                <label>Год публикации
                                    <input type="number" name="publicationYear" placeholder=""
                                           className={'form-control' + (invalidFields.includes('publicationYear') ? ' is-invalid' : '')}
                                           value={book.publicationYear ? book.publicationYear : ''} onChange={handleChange} />
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Имя автора
                                    <input type="text" name="authorNameRus" placeholder="Имя автора на русском"
                                           className={'form-control' + (invalidFields.includes('authorNameRus') ? ' is-invalid' : '')}
                                           value={book.authorNameRus ? book.authorNameRus : ''} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="form-group col-md-4 col-lg-4">
                                <label>Имя автора в оригинале
                                    <input type="text" className="form-control" name="authorNameOrig"
                                           value={book.authorNameOrig ? book.authorNameOrig : ''} onChange={handleChange}
                                           placeholder="Author name"/>
                                </label>
                            </div>
                            <div className="form-group col-md-3 col-lg-3">
                                <label>Ссылка на обложку
                                    <input type="url" className="form-control" name="coverImageLink"
                                           value={book.coverImageLink ? book.coverImageLink : ''} onChange={handleChange}
                                           placeholder="Image URL"/>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6 col-lg-6">
                                <label>Аннотация
                                    <textarea rows="3" className="form-control" id="bookAnnotation" name="annotation"
                                              value={book.annotation ? book.annotation : ''} onChange={handleChange}
                                              placeholder="Краткое описание книги, которое дает читателю представление о произведении"/>
                                </label>
                            </div>
                            <div className="form-group col-md-6 col-lg-6">
                                <label>Комментарий
                                    <textarea rows="3" className="form-control" id="userComment" name="comment"
                                              value={book.comment ? book.comment : ''}
                                              onChange={handleChange}
                                              placeholder="Комментарий пользователя (читателя)"/>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-8 col-lg-8">
                                <label>Статус чтения
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="readStatus"
                                                       onChange={handleChange} value="Has been read"
                                                       checked={book.readStatus === 'Has been read'}/>Была
                                                прочитана
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="readStatus"
                                                       onChange={handleChange} value="Current book"
                                                       checked={book.readStatus === 'Current book'}/>Текущая книга
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="readStatus"
                                                       onChange={handleChange} value="To read"
                                                       checked={book.readStatus === 'To read'}/>Предстоит
                                                прочитать
                                            </label>
                                        </div>
                                    </div>
                                </label>
                            </div>

                            <div className="form-group col-md-4 col-lg-4">
                                <label>Оценка
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={handleChange} value="1"
                                                       checked={book.assessment === 1}/>1
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={handleChange} value="2"
                                                       checked={book.assessment === 2}/>2
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={handleChange} value="3"
                                                       checked={book.assessment === 3}/>3
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={handleChange} value="4"
                                                       checked={book.assessment === 4}/>4
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={handleChange} value="5"
                                                       checked={book.assessment === 5}/>5
                                            </label>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group offset-md-9 col-md-3">
                                <button type="submit" className="btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-sm-4 col-md-4 col-lg-4">
                    <BookCard data={book} />
                </div>
            </div>
        </div>

    );
};

export default BookEditFormComponent;