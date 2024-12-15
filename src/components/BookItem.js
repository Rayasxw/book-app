import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  IconButton,
  Slider,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const BookItem = ({ book, onDelete, onOpen, onProgressChange }) => {
  const handleProgressChange = (_, value) => {
    if (value >= 0 && value <= 100) {
      onProgressChange(book.id, value);
    }
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        mb: 1,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
        <ListItemText
          primary={book.title}
          secondary={`Автор: ${book.author}`}
        />
        <Box>
          <IconButton onClick={() => onOpen(book)} title="Открыть книгу">
            <MenuBookIcon />
          </IconButton>
          <IconButton 
            onClick={() => onDelete(book.id)} 
            color="error"
            title="Удалить книгу"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
        <Slider
          value={book.progress}
          onChange={handleProgressChange}
          aria-labelledby="reading-progress"
          valueLabelDisplay="auto"
        />
        <Typography variant="body2" sx={{ minWidth: 45 }}>
          {book.progress}%
        </Typography>
      </Box>
    </ListItem>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func.isRequired,
};

export default BookItem;