/**
 * Компонент визуального представления книги пользователя в форме элементов Card из bootstrap.
 * Обложку и блок с аннотацией можно развернуть и свернуть.
 * Пепреход к редактированию происходит при помощи Link
 */

import React from 'react';
import {Link} from "react-router-dom"
import '../css/BookListItem.css'
import '../css/hint.css'

const BookCard = ({data:{
                        assessment,
                        titleRus,
                        titleOrig,
                        coverImageLink: coverUrl,
                        authorNameOrig,
                        authorNameRus,
                        annotation,
                        readStatus,
                        comment,
                        id,
                        publicationYear: year
                    },
                    removeHandler}) =>
{

    let assessmentClass = '';
    let readStatusClass = '';
    let readStatusRus = '';

    // стилизация элемента с оценкой с использованием классов bootstrap
    switch (assessment) {
        case 1:
        case 2:
            assessmentClass = 'alert-danger';
            break;
        case 3:
            assessmentClass = 'alert-warning';
            break;
        case 4:
            assessmentClass = 'alert-info';
            break;
        case 5:
            assessmentClass = 'alert-success';
            break;
        default:
            assessmentClass = 'sr-only';
            break;
    }

    // стилизация элемента со статусом чтения с использованием классов bootstrap
    switch (readStatus) {
        case 'Has been read':
            readStatusClass = 'alert-success';
            readStatusRus = 'Была прочитана';
            break;
        case 'Current book':
            readStatusClass = 'alert-info';
            readStatusRus = 'Текущая книга';
            break;
        default:
            readStatusClass = 'alert-secondary';
            readStatusRus = 'Предстоит прочитать';
            break;
    }

    /**
     * Обработчик переключения вида обложки (сжатый/развёрнутый) и аннотации (скрытый/развёрнутый)
     * @param event
     */
    const switchViewType = (event) => {
        let {tagName, classList} = event.target;

        if ( tagName === 'I' && classList.contains('img-size-toggle-icon')) {
            event.target.closest('.card-img-container').classList.toggle("wrapped-content");
            event.target.classList.toggle("fa-compress-arrows-alt");
            event.target.classList.toggle("fa-expand-arrows-alt");
        }

        if ( tagName === 'I' && classList.contains('text-size-toggle-icon')) {
            event.target.closest('.card-text-container').classList.toggle("wrapped-content");
            event.target.classList.toggle("fa-caret-square-down");
            event.target.classList.toggle("fa-caret-square-up");
        }
    };

    return (
        <div className="book-list-item">

            <div className="card">
                <div className="card-header">
                    <h5 className={"card-title "+(titleOrig ? '' : 'single-title')}>{titleRus}</h5>
                    {titleOrig && <h6 className="card-subtitle text-muted">{titleOrig}</h6>}
                </div>
                <div className="card-img-container wrapped-content">
                    <div className="card-img-wrapper">
                        <img src={coverUrl} className="img-fluid rounded-sm" alt="book cover"/>
                        {
                            coverUrl &&
                            <i className="fas fa-expand-arrows-alt img-size-toggle-icon" onClick={switchViewType}></i>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="author-name-panel">
                        <h6 className="card-subtitle text-muted">
                            {authorNameRus}   <span className="badge badge-secondary">{year}</span>
                        </h6>
                        <h6 className="card-subtitle text-muted">
                            {authorNameOrig}
                        </h6>
                    </div>
                    <div className="card-text-container wrapped-content">
                        <p className="card-text">{annotation}</p>
                        {
                            annotation &&
                            <i className="far fa-caret-square-down text-size-toggle-icon" onClick={switchViewType}></i>
                        }
                        {
                            comment  &&
                                <div className="alert alert-secondary user-comment-panel" role="alert" aria-label='комментарий'>
                                    <i>{comment}</i>
                                </div>
                        }
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6 read-status-container">
                            <div className={"alert "+readStatusClass} role="alert">{readStatusRus}</div>
                        </div>

                        <div className="col-md-2 col-lg-1 assessment-container">
                            <div className={"alert hint--top "+assessmentClass} role="alert" aria-label='оценка'
                                 data-placement="top"><b>{assessment}</b></div>
                        </div>
                        {
                            id &&
                            <div className="col-md-1 offset-md-2 ">
                                <Link to={"/edit/" + id}>
                                    <button type="button" className="btn btn-sm btn-dark hint--top"
                                            aria-label='изменить'>
                                        <i className="far fa-edit"></i>
                                    </button>
                                </Link>
                            </div>
                        }
                        {
                            removeHandler &&
                            <div className="col-md-1">
                                <button type="button" className="btn btn-sm btn-dark hint--top" aria-label='удалить'
                                        onClick={() => removeHandler(id)} >
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;