require("./src/bootstrap");
const socketIo = require('./src/socketIo');
const consumer = require('./src/consumer');

const io = socketIo();

consumer(({channel, message}) => {
  console.log(channel, message)
  io.emit(channel, message);
});

io.listen(process.env.PORT);
console.log(`Servidor socket ouvindo na porta ${process.env.PORT}`)