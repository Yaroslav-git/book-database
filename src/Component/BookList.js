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
        this.fetchBookList();
    }

    fetchBookList = () => {

        let bodyData = {
            action: 'get_book_list',
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
                if ( response.status === 'success' ) {
                    this.setState({
                        userBookList: response.data,
                    });
                }
                if ( response.status === 'error' ) {
                    if ( response.message === 'authentication required' )
                        this.props.authRequestHandler(response.message);
                    else
                        alert(response.message);
                }
            });
    }

    removeBook = (bookId) => {

        let bodyData = {
            action: 'remove_book',
            bookId: bookId,
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
                    alert("Книга удалена");
                    //this.refreshBookList();
                    this.fetchBookList();
                }

                if ( response.status === 'error' ) {
                    if ( response.message === 'authentication required' )
                        this.props.authRequestHandler(response.message);
                    else
                        alert("Ошибка: "+response.message);
                }
            });
    }

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
                //removeHandler={this.props.removeHandler}
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