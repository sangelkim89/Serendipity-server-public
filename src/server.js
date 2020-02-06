import './env';
const PORT = process.env.PORT || 4000;

import { GraphQLServer } from 'graphql-yoga';
import schema from '../schema';
import morgan from 'morgan';

import { isAuthenticated } from './middleware';
import './passport';
import { authenticateJwt } from './passport';
import { uploadMiddleware, uploadController } from './upload';

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(morgan('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);
server.start({ port: PORT }, () => console.log(`Server running on  http://localhost:${PORT}`));
