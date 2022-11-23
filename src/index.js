import express from "express";
import https from "https";

const isValidUrl = (url) => {
  return url.includes("://");
};

const app = express();
const download = [];
const startTime = new Date().getTime();

const formatTime = (time) => {
  let h = Math.floor(time / 3600);
  let m = Math.floor((time - h * 3600) / 60);
  let s = Math.floor(time % 60);

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  return h + ":" + m + ":" + s;
};

app.get("/", (_, res) => {
  const currTime = (new Date().getTime() - startTime) / 1000;

  res.send({
    status: "active",
    uptime: formatTime(currTime),
  });
});

app.get("/download", (_, res) => {
  res.send(download);
});

app.get("/download/*", (req, res) => {
  const downloadUrl = req.protocol + "://" + req.hostname + req.path;
  const url = req.path.replace("/download/", "");

  if (!isValidUrl(url)) {
    return res.status(401).send({ message: "invalid url" });
  }

  const request = https.get(url, function (response) {
    const contentType = response.headers["content-type"] || "";

    res.setHeader("Content-Type", contentType);

    download.push({ url, contentType, downloadUrl });

    response.pipe(res);
  });

  request.on("error", function (e) {
    console.error(e);
    return res.status(503).send({ message: "some error occured" });
  });

  request.on("close", res.end);
});

app.listen(process.env.PORT || 80, () => {
  console.log("started http://localhost");
});
