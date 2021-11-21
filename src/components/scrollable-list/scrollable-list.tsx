import React from "react";
import { useSelector } from 'react-redux';

import { FeedCard } from '../feed-card/feed-card';
import s from './scrollable-list.module.css';
import { TOrder } from '../../utils/types';


export function ScrollableList () {

  const currentOrders: Array<TOrder> = useSelector((store: any) => store.ws.ordersData.orders);


  return (
    <article className={s.main}>
      {/* <div className={s.temporary}></div> */}
      { currentOrders.map((order: TOrder) => <FeedCard orderData={order} key={order.number} />) }
      
    </article>
  );
}