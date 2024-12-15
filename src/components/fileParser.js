import mammoth from 'mammoth';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';

export const parseFile = async (file) => {
  if (!navigator.onLine) {
    throw new Error('Нет интернет-соединения');
  }

  if (file.size > 10 * 1024 * 1024) { 
    throw new Error('Размер файла превышает допустимый предел. Максимальный размер 10MB');
  }

  const fileType = file.name.split('.').pop().toLowerCase();
  
  try {
    switch (fileType) {
      case 'txt':
        return await parseTxt(file);
      case 'docx':
        return await parseDocx(file);
      case 'pdf':
        return await parsePdf(file);
      default:
          throw new Error('Неподдерживаемый формат файла. Пожалуйста, используйте файлы .txt, .docx или .pdf');
      }
  } catch (error) {
    console.error('Ошибка парсинга файла:', error);
    throw new Error(`Не удалось прочитать файл: ${error.message}`);
  }
};

const parseTxt = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Не удалось прочитать текстовый файл'));
    reader.readAsText(file, 'UTF-8');
  });
};

const parseDocx = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error('Не удалось прочитать DOCX файл');
  }
};

const parsePdf = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    throw new Error('Не удалось прочитать PDF файл');
  }
};