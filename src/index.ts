import moment from 'moment';

import api from './api';
import Model from './models/Interface';

import Inter from './models/Inter';
import Oi from './models/Oi';
import BCFF11 from './models/BCFF11';
import HGLG11 from './models/HGLG11';

async function getData(model: Model): Promise<object> {
  const { data } = await api({
    params: {
      item: model.code,
    },
  });
  const values = data.docs[0];

  const dateSplit = [
    values.date.slice(0, 4), // year
    values.date.slice(4, 6), // month
    values.date.slice(6, 8), // day
    values.date.slice(8, 10), // hour
    values.date.slice(10, 12), // minutes
    values.date.slice(12, 14), // minutes
  ];

  const payload = {
    ...model,
    ...values,
    date: moment(dateSplit)
      .locale('pt-br')
      .format('L à\\s LT'),
  };
  return payload;
}

async function getActions(): Promise<void> {
  const inter = await getData(Inter);
  const oi = await getData(Oi);
  const bcff11 = await getData(BCFF11);
  const hglg11 = await getData(HGLG11);
  console.log([inter, oi, bcff11, hglg11]);
}

getActions();
