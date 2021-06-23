module.exports = async () => {
  process.nextTick(() => {
    var io = require("socket.io")(strapi.server);
    let users = [];
    let rooms = [];
    var mercadopago = require("mercadopago");
    mercadopago.configure({
      access_token:
        "TEST-2825597988473691-120214-d4d82f5bbc8b8f574265339f6d4cf0ae-102188289",
    });

    // var preference = {
    //   items: [
    //     {
    //       title: "Paseo de poncho",
    //       quantity: 1,
    //       currency_id: "ARS",
    //       unit_price: 250,
    //     },
    //   ],
    // };

    // mercadopago.preferences
    //   .create(preference)
    //   .then(function (response) {
    //     // Este valor reemplazará el string "<%= global.id %>" en tu HTML
    //     console.log(response);
    //     global.id = response.body.id;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    io.on("connection", (socket) => {
      console.log("connection");
      if (!users.find((user) => user.socketId == socket.id)) {
        console.log(
          "el usuario que se conecto no esta guardado en la lista",
          users
        );
        console.log(socket.id);
        //forma de reconnectar habria q ver
      }
      // if()
      socket.on("join", (data) => {
        // if (!users.find((user) => user.user_id == data.user_id)) {
        //en vez de este if neceisto renovar el socket id en la reconexion
        const user = {
          socketId: socket.id,
          ...data,
        };

        users.push(user);
        socket.emit("new-user", user);

        if (data.room) {
          socket.join(data.room);
          rooms.push({ room: data.room, user_id: data.user_id });
          io.to(data.room).emit("join-room", {
            room: data.room,
            user: user,
          });
        }
        // }
      });

      socket.on("position-change", (data) => {
        // console.log('usuarios',users)
        console.log(data.coords);

        //  socket.to(data.paseos_id).emit('paseador-position', {
        //   data
        //   })  //sennd multiple rooms

        socket.to(data.paseos_id).emit("paseador-position", {
          data,
        });
      });
      socket.on("status-paseo", (data) => {
        console.log(data);
        socket.to(data.paseo_id).emit("status-paseo", data);
        console.log(rooms);
      });
      socket.on("alert", (data) => {
        console.log(data);
        socket.to(data.romm).emit("alert", data);
      });
      socket.on("disconnect", (reason) => {
        console.log("disconected reason", reason);
        users = users.filter((user) => user.socketId !== socket.id);
        if (reason === "io server disconnect") {
          // the disconnection was initiated by the server, you need to reconnect manually
          io.connect();
        }
      });
      socket.on("reconnect", (r) => {
        console.log("reconnected", r);
      });
    });
    strapi.io = io; // register socket io inside strapi main object to use it globally anywhere
  });
};
