import React, { useEffect } from 'react';
import { appUseSelector, appUseDispatch } from '../services/hooks';
import { ScrollableList } from '../components/scrollable-list/scrollable-list';
import { wsActions } from '../services/actions/wsActions';
import { TOrder } from '../utils/types';
import s from './feed.module.css';

export function FeedPage() {

  const dispatch = appUseDispatch();

  const currentOrders: ReadonlyArray<TOrder> = appUseSelector((store) => store.ws.ordersData.orders);
  const ordersTotalToday = appUseSelector((store) => store.ws.ordersData.totalToday);
  const ordersTotalEver = appUseSelector((store) => store.ws.ordersData.total);

  // массивы для хранения выполненных и готовящихся заказов
  const оrdersDone: number[] = [];
  const оrdersInWork: number[] = [];

  // заполняем массивы объектами заказов:
  if (currentOrders) {
    currentOrders.forEach((item: TOrder) => {
      if (item.status === 'done') {
        оrdersDone.push(item.number);
      } else {
        оrdersInWork.push(item.number);
      }
    });
  }

  // вернёт разметку элемента списка готовящихся/выполненных заказов
  const getLiElement = (orderNumber: number, key: number) => {
    return (<li className={s.liElem + ' text text_type_digits-default mb-2'} key={key}>{orderNumber}</li>)
  }

  useEffect(() => {
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
      <section className={s.headerSection}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </section>

      <section className={s.feedData}>

      {/* СЛЕВА: Секция с лентой заказов */}
        <section className={s.feedContent}>
          <ScrollableList isPersonal={false} />
        </section>

      {/* СПРАВА: Секция со статистикой */}
        <section className={s.feedChart}>

          {/* --------- "Готовы", "В работе" */}
          <div className={s.currentOrders}>

            <div className={s.currentChart}>
              <span className={'text text_type_main-medium mb-6'}>Готовы</span>
              <ul className={s.ul} style={{ color: '#00CCCC' }}>
                {оrdersDone.slice(0, 18).map((item) => getLiElement(item, item))}
              </ul>
            </div>

            <div className={s.currentChart}>
              <span className={'text text_type_main-medium mb-6'}>В работе</span>
              <ul className={s.ul}>
                {оrdersInWork.slice(0, 18).map((item) => getLiElement(item, item))}
              </ul>
            </div>

          </div>

          {/* --------- "Выполнено" */}
          <div className={s.totalChart}>

            <div className={s.totalBlock}>
              <span className={s.bigHeader + ' text text_type_main-medium mt-15'}>Выполнено за всё время</span>
              <span className={' text text_type_digits-large mb-15'}>{ordersTotalEver}</span>

            </div>

            <div className={s.totalBlock}>
              <span className={s.bigHeader + ' text text_type_main-medium mt-15'}>Выполнено за сегодня</span>
              <span className={' text text_type_digits-large mb-15'}>{ordersTotalToday}</span>
            </div>

          </div>

        </section>
      </section>

    </>
  );
}