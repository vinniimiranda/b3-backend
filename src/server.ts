import Socket from 'socket.io';
import { createServer } from 'http';
import { getActions } from './index';

const PORT = process.env.PORT || 3333;
const server = createServer();

const io = Socket(server);

io.on('connection', async client => {
  console.log(client.id);

  io.emit('getData', await getActions());
});

setInterval(async () => {
  io.emit('getData', await getActions());
}, 60000);

export default server.listen(PORT);
