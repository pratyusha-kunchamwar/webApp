const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const port = 3030;

const server = http.createServer((request, response) => {
  let storeUrl = request.url.split("/");
  request.url = storeUrl[1];
  if (request.method === "GET") {
    switch (request.url) {
      case "html":
        {
          fs.readFile(
            "./files/htmlData.html",
            "utf-8",
            (error, htmlContent) => {
              if (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error reading HTML File");
              } else {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(htmlContent);
                response.end();
              }
            }
          );
        }
        break;

      case "json":
        {
          fs.readFile(
            "./files/jsonData.json",
            "utf-8",
            (error, jsonContent) => {
              if (error) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error reading JSON File");
              } else {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(jsonContent);
                response.end();
              }
            }
          );
        }
        break;

      case "uuid":
        {
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify({ uuid: uuidv4() }));
          response.end();
        }
        break;
      //to get particular status code
      case "status":
        {
          let statusCode = storeUrl[2];

          switch (statusCode) {
            case "100":
              response.writeHead(200, { "Content-Type": "text/plain" });
              response.end("Status Code 100 for Continue");
              break;
            case "200":
              response.writeHead(200, { "Content-Type": "text/plain" });
              response.end("Status Code 200 for Ok, Request is Successful");
              break;
            case "300":
              response.writeHead(300, { "Content-Type": "text/plain" });
              response.end(
                "Status Code 300 for Multiple Options to choose like Redirect etc.."
              );
              break;
            case "400":
              response.writeHead(400, { "Content-Type": "text/plain" });
              response.end("Status Code 400 Bad Request");
              break;
            case "500":
              response.writeHead(500, { "Content-Type": "text/plain" });
              response.end("Status Code 500 Internal Server Error");
              break;
            default:
              response.end("Please Enter Correct Status Code");
          }
        }
        break;

      case "delay": {
        let timeDelay = Number(storeUrl[2]);
        setTimeout(() => {
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end(`Success after ${timeDelay} seconds delay`);
        }, timeDelay * 1000);
      }
    }
  }
});
server.listen(port, () => {
  console.log(`server is running at  http://localhost:${port}`);
});
