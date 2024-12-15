import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { parseFile } from './fileParser';

const Input = styled('input')({
  display: 'none',
});

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !file) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const content = await parseFile(file);
      onAddBook({ title, author, content });
      
      
      setTitle('');
      setAuthor('');
      setFile(null);
      setFileName('');
    } catch (error) {
      setError(`Ошибка обработки файла: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const acceptedFormats = '.txt,.docx,.pdf';

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Добавить новую книгу
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Название книги"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Автор"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          required
        />
        <label htmlFor="contained-button-file">
          <Input
            accept={acceptedFormats}
            id="contained-button-file"
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }}
          />
          <Button variant="contained" component="span" fullWidth>
            Загрузить файл 
          </Button>
        </label>
        {fileName && (
          <Typography variant="body2" color="textSecondary">
            Выбранный файл: {fileName}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Добавить книгу'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddBookForm;