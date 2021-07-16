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
            this.fetchBook(this.props.bookId);
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
    }

    fetchBook = (bookId) => {
        let bodyData = {
            action: 'get_book',
            bookId: bookId,
            sessionId: this.props.sessionId
        };

        fetch( this.props.backendUrl ,
            {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                body: JSON.stringify(bodyData)
            }
        )
            .then(response => response.json())
            .then(response => {
                if (response.status === 'success') {
                    this.setState({
                        bookId: bookId,
                        book: response.data
                    });
                }
                if ( response.status === 'error' ) {
                    if ( response.message === 'authentication required' )
                        this.props.authRequestHandler(response.message);
                    else
                        alert("Ошибка: "+response.message);
                }
            });
    }

    createNewBook = () => {
        let bodyData = {
            action: 'add_book',
            book: this.state.book,
            sessionId: this.props.sessionId
        };

        fetch(  this.props.backendUrl,
            {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                body: JSON.stringify(bodyData)
            }
        )
            .then(response => response.json())
            .then(response => {

                if ( response.status === 'success' ) {
                    this.setState({
                        editedBookId: response.data.bookId
                    });
                    alert("Книга успешно добавлена");
                }

                if ( response.status === 'error' ) {
                    if ( response.message === 'authentication required' )
                        this.props.authRequestHandler(response['message']);
                    else
                        alert("Ошибка: "+response.message);
                }
            });
    }

    updateBook = () => {
        let bodyData = {
            action: 'update_book',
            bookId: this.state.bookId,
            book: this.state.book,
            sessionId: this.props.sessionId
        };

        fetch(  this.props.backendUrl,
            {
                method: 'POST',
                mode: 'cors',
                credentials: "include",
                body: JSON.stringify(bodyData)
            }
        )
            .then(response => response.json())
            .then(response => {

                if ( response.status === 'success' ) {
                    /*this.setState({
                        editedBookId: response.data.bookId
                    });*/
                    alert("Книга успешно изменена");
                }

                if ( response.status === 'error' ) {
                    if ( response.message === 'authentication required' )
                        this.props.authRequestHandler(response['message']);
                    else
                        alert("Ошибка: "+response.message);
                }
            });
    }

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
                /*handleChange={this.handleChange}*/
                handleSubmit={this.saveChanges}
            />
        );
    }
}

export default BookEditForm;