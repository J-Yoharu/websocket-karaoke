module.exports = ({ handshake }, next) => {
 const origins = process.env.ORIGIN.split(',');
 const origin = handshake.headers.origin;
 if(origins.includes(origin)) return next();
 return next(new Error('Erro ao conectar deste domínio'))
}