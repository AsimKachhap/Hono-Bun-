import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { stream, streamText, streamSSE } from "hono/streaming";

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

// Read all (using Stream)

app.get("/videos", (c) => {
  return streamText(c, async (stream) => {
    for (const video of videos) {
      await stream.writeln(JSON.stringify(video));
      await stream.sleep(1000);
    }
  });
});

export default app;
