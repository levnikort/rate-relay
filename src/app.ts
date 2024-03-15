import { Server } from "@hapi/hapi";
import { mainRoutes } from "./routes/main.routes";

const init = async () => {
  const server = new Server({
    port: process.env.SERVER_PORT,
    host: process.env.SERVER_HOST,
    routes: {
      cors: {
        origin: process.env.CORS_ORIGIN.split(","),
        maxAge: 60,
        credentials: true,
      },
    },
  });

  mainRoutes(server);

  await server.start();
}

export { init };