import React, { useState } from 'react';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import CurrentActiveTab from './CurrentActiveTab';


const ACCEPTED_FORMAT = 'text/html';

async function readFile(file: File) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsText(file);
  });
}

async function injectFileContent(file: File) {
  if (!file) {
    return;
  }

  const fileContent = await readFile(file);
  alert(fileContent);
}

const Popup = () => {

  const theme = useStorage(exampleThemeStorage);
  const [file, setFile] = useState<File>();
  const [errorMessage, setErrorMessage] = useState('');

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');

    const inputFile = e.target.files[0];
    if (inputFile && inputFile.type === ACCEPTED_FORMAT) {
      setFile(inputFile);
    }
  }

  function handleSubmit() {
    if (!file) {
      setErrorMessage('שגיאה: לא נבחר קובץ');
    } else {
      setErrorMessage('');
      injectFileContent(file);
    }
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}
    >
      <header className="App-header" style={{ color: theme === 'light' ? '#000' : '#fff' }}>
        <CurrentActiveTab />
        <label>
          <input type="file" accept={ACCEPTED_FORMAT} onChange={handleFileSelected} />
        </label>
        <button onClick={handleSubmit}>השתמש בקובץ</button>
        {errorMessage
          ? <p className="error">{errorMessage}</p>
          : undefined
        }
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
