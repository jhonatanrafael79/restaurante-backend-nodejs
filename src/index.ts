import express from 'express';
import cors from 'cors';
import DB_CONNECTION from './database';
import initializeConfig from './shared/config';
import { Server, Socket } from 'socket.io';
import http from 'http';
import routes from './routes/index.routes';
import jwt from 'jsonwebtoken';
import { getDeliverySocket, updateDeliveryState } from './shared/socket/delivery.socket';
// import UserModel from './models/User.model';

const env = initializeConfig();
DB_CONNECTION();

const app = express();

app.use(express.json());
app.use(cors());

let PORT = env.PORT; // 80 - 655NN
const url: string = `http://localhost:${PORT}`;

app.get('/', (request, response) => {
	const { params, query, body } = request;
	console.log({params, query, body});
	response.send({
		success: true,
		message: 'El Servidor se esta ejecutando correctamente!'
	});
});

app.use('/api', routes); //localhost:PORT/api/

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`El servidor se esta ejecutando en el puerto ${PORT}, visite: ${url} `);
	console.log(`El ambiente de desarrollo es: ${process.env.NODE_ENV}`)
});

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
	}
});

io.on('connection', (client: Socket) => {
	client.on('testing', data => {
		console.log("Se ejecuto testing: ", data);
	} )

	client.on('join-to-my-room', (token) => {
		const { uid } : any = jwt.decode(token);
		client.join(uid);
		console.log('client added to room ', uid)
	})
/*
	client.on('join-toMyRooms', async (token) => {

		const user = await UserModel.findById(uid);

		if(user.role === '1'){
			client.join('sede A')
		}
		if(user.role === '2'){
			client.join('sede B')
		}

	})
*/
	client.on('delivery-tracking', async (token: string) => {
		const { uid } : any = jwt.decode(token);
		const data = await getDeliverySocket(uid);
		console.log({data})
		io.to(client.id).emit('delivery-getted', data);
	} )

	client.on('delivery-updated', async ({deliveryId, newState, userId}) => {
		const data = await updateDeliveryState(deliveryId, newState);
		console.log("delivery updated")
		io.to(userId).emit('delivery-update', data)
	})
	console.log('client connected!')
})

export {
	io
}