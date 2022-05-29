import axios from "axios";
const BOOK_BASE_API_URL = "http://localhost:8089/api/v1/books";


class BookService {
    getAllBooks() {
        const token=window.localStorage.getItem("token");
        return axios.get(BOOK_BASE_API_URL, { headers: {
            Authorization: token,
          }}
          );
    }
    addBook(book) {
        const token=window.localStorage.getItem("token");
        return axios.post(BOOK_BASE_API_URL , book, {  headers: {
            Authorization: token
        
          }}
           )
    }

    getBookById(bookId){
        const token=window.localStorage.getItem("token");
        return axios.get(BOOK_BASE_API_URL+"/id/"+bookId, {  headers: {
            Authorization: token
        
          }})
    }

    updateBook(book){
        const token=window.localStorage.getItem("token");
        return axios.put(BOOK_BASE_API_URL, book,  {  headers: {
            Authorization: token
        
          }} );
    }
    deleteBook(bookId){
        const token=window.localStorage.getItem("token");
        return axios.delete(BOOK_BASE_API_URL+"/"+bookId,  {  headers: {
            Authorization: token
        
          }});
    }

    getBooksByValue(searchValue){
        const token=window.localStorage.getItem("token");
        return axios.get(BOOK_BASE_API_URL+"/"+searchValue,  {  headers: {
            Authorization: token
        
          }});

    }
    getBookCategories(){
        const token=window.localStorage.getItem("token");
        return axios.get(BOOK_BASE_API_URL+"/genres",  {  headers: {
            Authorization: token
        
          }});

    }
}
export default new BookService();