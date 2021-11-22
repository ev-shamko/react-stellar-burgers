import React from "react";
import { appUseSelector } from '../../services/hooks';

import { FeedCard } from '../feed-card/feed-card';
import s from './scrollable-list.module.css';
import { TOrder } from '../../utils/types';

type TScrollableListProps = {
  isPersonal: boolean,
}

export function ScrollableList({ isPersonal }: TScrollableListProps) {

  const currentOrders: ReadonlyArray<TOrder> = appUseSelector((store) => store.ws.ordersData.orders);

  let reversedOrdersList: Array<TOrder> = [];
  if (currentOrders && isPersonal) {
    reversedOrdersList = currentOrders.slice();
    reversedOrdersList = reversedOrdersList.reverse();
  }

  return (
    <article className={s.main}>

      {/* в /feed ленту заказов нужно отображать в прямом порядке, как она с сервера приходит */}
      {!isPersonal && currentOrders && currentOrders.map((order: TOrder) => <FeedCard orderData={order} isPersonal={isPersonal} key={order.number} />)}

      {/* в profile/orders ленту заказов нужно отображать в обратном порядке, потому что с сервера она приходит отсортированная так, что наверху самые старые заказы */}
      {isPersonal && reversedOrdersList && reversedOrdersList.map((order: TOrder) => <FeedCard orderData={order} isPersonal={isPersonal} key={order.number} />)}
    </article>
  );
}