const originMiddleware = require('./middlewares/origin');

module.exports = () => {
  const options = { /* ... */ };
  const io = require("socket.io")(options);
  io.use(originMiddleware);

  let sockets = [];
  io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`)

    socket.on("error", (err) => socket.disconnect());
    
    socket.on("disconnect", () => {
      index = sockets.findIndex((s) => s.id == socket.id);
      if (index == -1) return;
      console.log(`socket ${socket.id} disconnect`);
      sockets.splice(0, index);
    });
    sockets.push(socket);
  });

  return io;
};