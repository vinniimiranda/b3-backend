import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://api.cotacoes.uol.com/asset/intraday/list/?format=JSON&fields=price,high,low,open,volume,close,bid,ask,change,pctChange,date&',
});

export default api;
