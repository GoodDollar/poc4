// Listen to incoming HTTP requests, can only be used on the server
Meteor.startup(() => {
    console.log("Setting cors")
    WebApp.rawConnectHandlers.use("/", function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return next();
    });
  }
)
