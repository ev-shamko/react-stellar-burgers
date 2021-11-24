import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { appUseSelector, appUseDispatch } from '../services/hooks';
// import { confirmAuthThunk } from '../services/actions/userActions';
import { getAccessTokenLiteral } from '../utils/cookie';


import { wsActions } from '../services/actions/wsActions';
import { TOrder } from '../utils/types';
import { FeedDetailedCard } from '../components/feed-detailed-card/feed-detailed-card';
import { wsAllOrders, wsOrders } from '../utils/api-url';
import {
  SET_DETAILED_ORDER_IN_MODAL,
} from '../services/actions/wsActions';


type TOrderPageProps = {
  privatType: 'feed' | 'personalOrder'
}

export const OrderPage = ({ privatType }: TOrderPageProps) => {
  const dispatch = appUseDispatch();
  let { id } = useParams<{ id?: string }>();

  const currentOrders: ReadonlyArray<TOrder> = appUseSelector((store) => store.ws.ordersData.orders);

  // объект, который нужно поместить в стейт для попапа
  let selectedOrder: undefined | TOrder;
  // данные в него запишутся после успешной установки ws и заполнения массива currentOrders
  if (currentOrders) {
    selectedOrder = currentOrders.find(obj => obj._id === id); // находим нужный объект в массиве

    dispatch({
      type: SET_DETAILED_ORDER_IN_MODAL,
      orderData: selectedOrder,
    });
  }

  console.log('id in OrderPage is ', id);
  console.log('obj', selectedOrder);


  // dispatch({
  //   type: wsActions.openConnection,
  //   url: wsOrders + `?token=${getAccessTokenLiteral()}`,     
  // });

  useEffect(() => {

    if (privatType === 'feed') {
      dispatch({
        type: wsActions.openConnection,
        url: wsAllOrders,
      });
    }

    // if (privatType === 'personalOrder') {
    //   dispatch({
    //     type: wsActions.openConnection,
    //     url: wsOrders + `?token=${getAccessTokenLiteral()}`,     
    //   });
    // }



    return () => {
      dispatch({ type: wsActions.closeConnection });
    };
  }, [dispatch]);

  return (
    <>
      <div>
      {`id in OrderPage is ${id}`}<br />
      {`type is ${privatType}`}<br />
      {`url will be ${wsAllOrders + '/' + id}`}<br />
      {selectedOrder ? selectedOrder.name : null}<br />
    </div>

      {currentOrders && selectedOrder ? <FeedDetailedCard /> : null}<br />
    </>
  )
}