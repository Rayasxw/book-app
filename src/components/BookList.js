import React from 'react';
import { List, Paper, Typography } from '@mui/material';
import BookItem from './BookItem';

const BookList = ({ books, onDelete, onOpen, onProgressChange }) => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Мои книги
      </Typography>
      <List>
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onDelete={onDelete}
            onOpen={onOpen}
            onProgressChange={onProgressChange}
          />
        ))}
      </List>
    </Paper>
  );
};

export default BookList;