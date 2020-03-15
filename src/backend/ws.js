const redisAdapter = require('socket.io-redis');
let io;

module.exports = {
  init: server => {
    io = require('socket.io').listen(server);
    io.adapter(redisAdapter(process.env.REDISCLOUD_URL));
    io.on('connection', socket => {
      // Join users into their own private room
      socket.on('join', data => {
        socket.join(data.id);
        io.to(data.id).emit('joined', `User ${data.id} joined`);
      });
      socket.on('disconnect', () => {
        // console.log('Client disconnected');
      });
    });
  },
  socket: () => io,
  connectedIds: () =>
    io.of('/').adapter.clients((err, clients) => {
      console.log(clients); // an array containing all connected socket ids
    }),
  allRooms: () =>
    io.of('/').adapter.allRooms((err, rooms) => {
      console.log(rooms); // an array containing all rooms (accross every node)
    }),
  connectedCount: () => io.engine.clientsCount
};
