import React from 'react'
import '../css/BookEditForm.css'

class BookEditFormComponent extends React.Component {

    constructor() {
        super();
        this.state = {
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
        }
    }

    componentDidMount() {
        if ( this.props.book )
            this.setState(this.props.book);
    }

    componentDidUpdate(prevProps) {
        if( prevProps.book.titleRus !== this.props.book.titleRus ) {
            this.setState(this.props.book);
        }
    }

    handleChange = (event) => {
        let {name, type, value, checked} = event.target;

        if ( name === 'assessment' )
            value = +value;

        this.setState({
            [name]: (type === 'checkbox' ? checked : value),
            saveButtonDisabled: false
        });

        if ( name === 'readStatus' && value !== 'Has been read' ) {
            this.setState({
                assessment: ''
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
    }

    render() {
        let assessmentClass = '';
        let readStatusClass = '';
        let readStatusRus = '';
        switch (this.state.assessment) {
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

        switch (this.state.readStatus) {
            case 'Has been read':
                readStatusClass = 'alert-success';
                readStatusRus = 'Была прочитана';
                break;
            case 'Current book':
                readStatusClass = 'alert-info';
                readStatusRus = 'Текущая книга';
                break;
            case 'To read':
                readStatusClass = 'alert-secondary';
                readStatusRus = 'Предстоит прочитать';
                break;
            default:
                readStatusClass = 'sr-only';
                break;
        }

    return (

        <div className="container-fluid book-edit-control">
            <div className="row">
                <div className="col-md-6 col-lg-6 offset-md-1 offset-lg-1">

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Название книги
                                    <input type="text" className="form-control" name="titleRus"
                                           value={this.state.titleRus ? this.state.titleRus : ''} onChange={this.handleChange}
                                           placeholder="Назване книги на русском"/>
                                </label>
                            </div>
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Название в оригинале
                                    <input type="text" className="form-control" name="titleOrig"
                                           value={this.state.titleOrig ? this.state.titleOrig : ''} onChange={this.handleChange}
                                           placeholder="Original book title"/>
                                </label>
                            </div>
                            <div className="form-group col-md-2 col-lg-2">
                                <label>Год публикации
                                    <input type="number" className="form-control" name="publicationYear"
                                           value={this.state.publicationYear ? this.state.publicationYear : ''} onChange={this.handleChange}
                                           placeholder=""/>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-5 col-lg-5">
                                <label>Имя автора
                                    <input type="text" className="form-control" name="authorNameRus"
                                           value={this.state.authorNameRus ? this.state.authorNameRus : ''} onChange={this.handleChange}
                                           placeholder="Имя автора на русском"/>
                                </label>
                            </div>
                            <div className="form-group col-md-4 col-lg-4">
                                <label>Имя автора в оригинале
                                    <input type="text" className="form-control" name="authorNameOrig"
                                           value={this.state.authorNameOrig ? this.state.authorNameOrig : ''} onChange={this.handleChange}
                                           placeholder="Author name"/>
                                </label>
                            </div>
                            <div className="form-group col-md-3 col-lg-3">
                                <label>Ссылка на обложку
                                    <input type="url" className="form-control" name="coverImageLink"
                                           value={this.state.coverImageLink ? this.state.coverImageLink : ''} onChange={this.handleChange}
                                           placeholder="Image URL"/>
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6 col-lg-6">
                                <label>Аннотация
                                    <textarea rows="3" className="form-control" id="bookAnnotation" name="annotation"
                                              value={this.state.annotation ? this.state.annotation : ''} onChange={this.handleChange}
                                              placeholder="Краткое описание книги, которое дает читателю представление о произведении"/>
                                </label>
                            </div>
                            <div className="form-group col-md-6 col-lg-6">
                                <label>Комментарий
                                    <textarea rows="3" className="form-control" id="userComment" name="comment"
                                              value={this.state.comment ? this.state.comment : ''}
                                              onChange={this.handleChange}
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
                                                       onChange={this.handleChange} value="Has been read"
                                                       checked={this.state.readStatus === 'Has been read'}/>Была
                                                прочитана
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="readStatus"
                                                       onChange={this.handleChange} value="Current book"
                                                       checked={this.state.readStatus === 'Current book'}/>Текущая книга
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="readStatus"
                                                       onChange={this.handleChange} value="To read"
                                                       checked={this.state.readStatus === 'To read'}/>Предстоит
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
                                                       onChange={this.handleChange} value="1"
                                                       checked={this.state.assessment === 1}/>1
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={this.handleChange} value="2"
                                                       checked={this.state.assessment === 2}/>2
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={this.handleChange} value="3"
                                                       checked={this.state.assessment === 3}/>3
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={this.handleChange} value="4"
                                                       checked={this.state.assessment === 4}/>4
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input className="form-check-input" type="radio" name="assessment"
                                                       onChange={this.handleChange} value="5"
                                                       checked={this.state.assessment === 5}/>5
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
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">{this.state.titleRus}</h5>
                            <h6 className="card-subtitle text-muted">{this.state.titleOrig}</h6>
                        </div>
                        <div className="card-img-container">
                            <img src={this.state.coverImageLink} alt="Card image cap"/>
                        </div>
                        <div className="card-body">
                            <h6 className="card-subtitle text-muted">
                                {this.state.authorNameRus} <span
                                className="badge badge-secondary">{this.state.publicationYear}</span>
                            </h6>
                            <h6 className="card-subtitle text-muted">
                                {this.state.authorNameOrig}
                            </h6>
                            <p className="card-text">
                                {this.state.annotation}
                            </p>
                            <div className="alert alert-secondary user-comment-panel" role="alert" aria-label='комментарий'>
                                <i>{this.state.comment}</i>
                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-4 col-lg-4 read-status-container">
                                    <div className={"alert " + readStatusClass} role="alert">{readStatusRus}</div>
                                </div>

                                <div className="col-md-2 col-lg-2 offset-md-6 offset-lg-6">
                                    <div className={"alert " + assessmentClass} role="alert">
                                        <b>{this.state.assessment}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
    }
}

export default BookEditFormComponent;