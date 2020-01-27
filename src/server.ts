import { createServer } from 'http';
import Socket from 'socket.io';

import { getActions } from './index';

const PORT = process.env.PROT || 3333;

const server = createServer();
const io = Socket(server);

io.on('connection', async client => {
  io.emit('getData', await getActions());
});

setInterval(async () => {
  io.emit('getData', await getActions());
}, 6000);

export default server.listen(PORT);
