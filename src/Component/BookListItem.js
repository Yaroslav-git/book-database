import React from 'react';
import '../css/BookListItem.css'
import '../css/hint.css'


function BookListItem({   data:{assessment},
                          data:{titleRus},
                          data:{titleOrig},
                          data:{coverImageLink: coverUrl},
                          data:{authorNameOrig},
                          data:{authorNameRus},
                          data:{annotation},
                          data:{readStatus},
                          data:{comment},
                          data:{id},
                          data:{publicationYear: year},
                          editHandler,
                          removeHandler,
                          switchViewType})
{

    let assessmentClass = '';
    let readStatusClass = '';
    let readStatusRus = '';
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

    let commentPanel = comment  ? <div className="alert alert-secondary user-comment-panel"
                                       role="alert" aria-label='комментарий'><i>{comment}</i></div>
                                : '';
/*
<p className="card-text wrapped-content">
{annotation}
{commentPanel}
<i className="far fa-caret-square-down text-size-toggle-icon" onClick={switchViewType}></i>
</p>
*/
    return (
        <div className="col-sm-6 col-md-4 col-lg-4 book-list-item">

            <div className="card">
                <div className="card-header">
                    <h5 className={"card-title "+(titleOrig ? '' : 'single-title')}>{titleRus}</h5>
                    {titleOrig && <h6 className="card-subtitle text-muted">{titleOrig}</h6>}
                </div>
                <div className="card-img-container wrapped-content">
                    <div className="card-img-wrapper">
                        <img src={coverUrl} className="img-fluid rounded-sm" alt="Card image cap"/>
                        <i className="fas fa-expand-arrows-alt img-size-toggle-icon" onClick={switchViewType}></i>
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
                        <i className="far fa-caret-square-down text-size-toggle-icon" onClick={switchViewType}></i>
                        {commentPanel}
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

                        <div className="col-md-1 offset-md-2 ">
                            <button type="button" className="btn btn-sm btn-dark hint--top" aria-label='изменить' onClick={() => editHandler(id)}>
                                <i className="far fa-edit"></i>
                            </button>
                        </div>
                        <div className="col-md-1">
                            <button type="button" className="btn btn-sm btn-dark hint--top" aria-label='удалить' onClick={() => removeHandler(id)} >
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
//
export default BookListItem;