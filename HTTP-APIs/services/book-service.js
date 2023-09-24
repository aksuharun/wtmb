import BaseService from './base-service.js'
import BookModel from '../models/book.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class BookService extends BaseService{
    constructor(){
        super(BookModel, `${__dirname}/../database/book-database.json`)
    }
}

export default new BookService()