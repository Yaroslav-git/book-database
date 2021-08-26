import React from 'react'
import BookEditFormComponent from './BookEditFormComponent'

class BookEditForm extends React.Component {

    constructor() {
        super();
        this.state = {
            bookId: undefined,
            book: {}
        }
    }

    componentDidMount() {
        if ( this.props.bookId ) {
            this.getBook(this.props.bookId);
        }
        else
            this.setEmptyBookData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.action !== prevProps.action)
            this.setEmptyBookData();
    }

    setEmptyBookData = () => {
        this.setState({
                bookId: undefined,
                book: {
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
        );
    };

    getBook = (bookId) => {

        let requestData = {
            action: 'get_book',
            bookId: bookId
        };

        this.props.backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    this.setState({
                        bookId: bookId,
                        book: response.data
                    });
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

    createNewBook = () => {

        let requestData = {
            action: 'add_book',
            book: this.state.book
        };

        this.props.backendProvider(requestData).then(
            response => {
                if ( response.status === 'success' ) {
                    this.setState({
                        editedBookId: response.data.bookId
                    });
                    alert("Книга успешно добавлена");
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

    updateBook = () => {

        let requestData = {
            action: 'update_book',
            bookId: this.state.bookId,
            book: this.state.book
        };

        this.props.backendProvider(requestData).then(
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

    saveChanges = (bookData) => {

        if ( bookData.readStatus === '' )
            bookData.readStatus = 'toRead';

        this.setState( prState => {
                return( {
                        book: bookData
                } );
            },
            () => {
                if ( this.props.action === 'create book' )
                    this.createNewBook();

                else if ( this.props.action === 'edit book' )
                    this.updateBook();
            }
            );
    }

    render() {

        return(
            <BookEditFormComponent
                book={this.state.book}
                handleSubmit={this.saveChanges}
            />
        );
    }
}

export default BookEditForm;