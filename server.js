// "use strict";

const Hapi = require("@hapi/hapi");
const dbpMdToJson = require("./index");
const fs = require("fs");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return dbpMdToJson({
        accessToken: process.env.DROPBOX_ACCESS_TOKEN,
        dbp_doc_id: request.query.docId,
        // default for nested === true
        nested: true
      })
        .then(data => {
          console.log("Dropbox Paper to json conversion! ✅");
          return JSON.stringify(data, null, 2);
        })
        .catch(err => {
          console.error(err);
        });
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();