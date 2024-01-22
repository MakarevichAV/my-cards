import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/SetsPage.css';

const SetsPage = () => {
  const { directoryId } = useParams();

  // Возможно, вам нужно получить данные о наборах для указанной директории
  // и использовать их для отображения содержимого страницы

  // Например:
  // const setsData = ... // получение данных о наборах для directoryId

  return (
    <div className='sets-page'>
      <Header showAddDirectory={false} />
      <h2>SetsPage</h2>
      <p>Directory ID: {directoryId}</p>
      {/* Ваши компоненты для отображения наборов */}
    </div>
  );
};

export default SetsPage;