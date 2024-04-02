import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";

const videos = [];

const app = new Hono();

app.post("/video", async (c) => {
  const { videoName, channelName, duration } = await c.req.json();
  const newVideo = {
    id: uuidv4(),
    videoName,
    channelName,
    duration,
  };

  videos.push(newVideo);
  return c.json(newVideo);
});

export default app;
