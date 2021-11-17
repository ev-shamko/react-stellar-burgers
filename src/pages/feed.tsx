import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAuth, patchUserData } from '../services/actions/userActions';
import { wsActions } from '../services/actions/wsActions';
import styles from './profile.module.css';

export function FeedPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getIngredients());
    dispatch({
      type: wsActions.openConnection,
      url: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      console.log('Размонтируем /feed');
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch]);

  return (
    <>
      /feed — страница ленты заказов. Доступна всем пользователям.
    </>
  );
}