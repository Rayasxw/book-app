import React, { useState, useEffect } from 'react';
import 'pdfjs-dist/build/pdf.worker.entry';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import ReadingModal from './components/ReadingModal';
import { GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import * as pdfjs from 'pdfjs-dist';

const theme = createTheme();

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = ({ title, author, content }) => {
    const newBook = {
      id: uuidv4(),
      title,
      author,
      content,
      progress: 0,
      addedAt: new Date().toISOString(),
    };
    setBooks([...books, newBook]);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleOpenBook = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleProgressChange = (id, progress) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, progress, lastRead: new Date().toISOString() } : book
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <AddBookForm onAddBook={handleAddBook} />
        <BookList
          books={books}
          onDelete={handleDeleteBook}
          onOpen={handleOpenBook}
          onProgressChange={handleProgressChange}
        />
        <ReadingModal
          open={modalOpen}
          book={selectedBook}
          onClose={() => setModalOpen(false)}
          onProgressUpdate={handleProgressChange}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;