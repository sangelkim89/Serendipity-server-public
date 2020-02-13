import "./env";
const PORT = process.env.PORT || 4000;

import { GraphQLServer } from "graphql-yoga";
import schema from "../schema";
import morgan from "morgan";

import { isAuthenticated } from "./middleware";
import "./passport";
import { authenticateJwt } from "./passport";
import { uploadMiddleware, uploadController } from "./upload";
import { editUserMiddleware, editUserController } from "./edit";

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(morgan("dev"));
server.express.use(authenticateJwt);

server.express.post("/api/img", editUserMiddleware, editUserController); //img포함 유저 edit 수정;;
server.express.post("/api/upload", uploadMiddleware, uploadController); //회원가입 및 사진 S3 에 저장;;
server.start({ port: PORT }, () => console.log(`Server running on  http://localhost:${PORT}`));
