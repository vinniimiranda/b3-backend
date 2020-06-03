import moment from 'moment';

import api from './api';
import Model from './models/Interface';

import Inter from './models/Inter';
import HGLG11 from './models/HGLG11';
import GOLL4 from './models/GOLL4';
import CVCB3 from './models/CVCB3';
import AZUL4 from './models/AZUL4';

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
    price: values.price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    date: moment(dateSplit).locale('pt-br').format('L à\\s LT'),
  };
  return payload;
}

export async function getActions(): Promise<Array<object>> {
  const inter = await getData(Inter);
  const hglg11 = await getData(HGLG11);
  const gol = await getData(GOLL4);
  const cvc = await getData(CVCB3);
  const azul = await getData(AZUL4);

  return [inter, cvc, azul, gol, hglg11];
}
