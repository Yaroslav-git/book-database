import React from 'react'
import BookListItem from './BookListItem'


class BookList extends React.Component {

    constructor(){
        super();
        this.state = {
            userBookList: []
        }
    }

    componentDidMount(){
        this.getBookList();
    }

    getBookList = () => {

        let requestData = {
            action: 'get_book_list',
            sessionId: this.props.sessionId
        };

        this.props.backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    this.setState({
                        userBookList: response.data,
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

    removeBook = (bookId) => {

        let requestData = {
            action: 'remove_book',
            bookId: bookId,
            sessionId: this.props.sessionId
        };

        this.props.backendProvider(requestData).then(
            response => {
                if (response.status === 'success') {
                    alert("Книга удалена");
                    this.getBookList();
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

    switchViewType = (event) => {
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
    }


    render() {
        let bookListItems = 'Book list is empty ((';

        if ( this.state.userBookList.length > 0 ) {
            bookListItems = this.state.userBookList.map(item => <BookListItem
                key={item.id}
                data={item}
                removeHandler={this.removeBook}
                editHandler={this.props.editHandler}
                switchViewType={this.switchViewType}
            />);
        }

        return (
            <div className="album py-5 bg-light">
                <div className="container-fluid">
                    <div className="row">
                        {bookListItems}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookList;