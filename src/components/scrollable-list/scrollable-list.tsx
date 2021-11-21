import React from "react";
import { useSelector } from 'react-redux';

import { FeedCard } from '../feed-card/feed-card';
import s from './scrollable-list.module.css';
import { TOrder } from '../../utils/types';

type TScrollableListProps = {
  isPersonal: boolean,
}

export function ScrollableList ({isPersonal}: TScrollableListProps) {

  const currentOrders: Array<TOrder> = useSelector((store: any) => store.ws.ordersData.orders);

  return (
    <article className={isPersonal ? s.mainReversed : s.main}> {/* в profile/orders ленту заказов нужно отображать в обратном порядке */}
      { currentOrders && currentOrders.map((order: TOrder) => <FeedCard orderData={order} key={order.number} />) }   
    </article>
  );
}