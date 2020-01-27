import Socket from 'socket.io';

import { getActions } from './index';

const PORT = process.env.PROT || 3333;

const io = Socket();

io.on('connection', async client => {
  console.log(client.id);

  io.emit('getData', await getActions());
});

setInterval(async () => {
  io.emit('getData', await getActions());
}, 6000);

export default io.listen(PORT);
