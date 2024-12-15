import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

const ReadingModal = ({ open, book, onClose, onProgressUpdate }) => {
  const content = useRef(null);

  useEffect(() => {
    if (book && content.current) {
      const { scrollHeight, clientHeight } = content.current;
      const scrollPosition = (book.progress / 100) * (scrollHeight - clientHeight);
      content.current.scrollTop = scrollPosition;
    }
  }, [book]);

  if (!book) return null;

  const handleScroll = () => {
    if (content.current) {
      const { scrollTop, scrollHeight, clientHeight } = content.current;
      const progress = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      if (progress >= 0 && progress <= 100 && progress > book.progress) {
        onProgressUpdate(book.id, progress);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { height: '80vh' }
      }}
    >
      <DialogTitle>
        {book.title}
        <Typography variant="subtitle1" color="textSecondary">
          Автор: {book.author}
        </Typography>
      </DialogTitle>
      <DialogContent
        ref={content}
        onScroll={handleScroll}
        sx={{ 
          padding: 3,
          '& *': {
            fontFamily: 'inherit',
            fontSize: '1rem',
            lineHeight: 1.6
          }
        }}
      >
        <Box sx={{ 
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          textAlign: 'justify'
        }}>
          {book.content}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

ReadingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onProgressUpdate: PropTypes.func.isRequired,
};

export default ReadingModal;