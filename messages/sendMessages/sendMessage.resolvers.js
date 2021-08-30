import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

const sendMessageFn = async (_, { payload, roomId, userId }, { loggedInUser }) => {
  let room = null;
  if (userId) {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        ok: false,
        error: "This user does not exist.",
      };
    } 
    room = await client.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
            {
              id: loggedInUser.id,
            },
          ],
        },
      },
    });
  } else if (roomId) {
    room = await client.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });
    if (!room) {
      return {
        ok: false,
        error: "Room not found.",
      };
    }
  }
  const message = await client.message.create({
    data: {
      payload,
      room: {
        connect: {
          id: room.id,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  console.log(message)
  pubsub.publish(NEW_MESSAGE, {roomUpdates: message})
  // pubsub.publish(NEW_MESSAGE, {roomUpdates: {...message}})
  return {
    ok: true,
  };
}

// //mine
// const sendMessageFn = async (
//   _,
//   { payload, roomId, userId },
//   { loggedInUser }
// ) => {
//   if ((roomId, !userId)) {
//     const room = await client.room.findUnique({ where: { id: roomId } });
//     console.log(room);
//     const message = await client.message.create({
//       data: {
//         payload,
//         user: {
//           connect: { id: loggedInUser.id },
//         },
//         room: { connect: { id: roomId } },
//       },
//     });
//     console.log(message);
//     return {
//       ok: true,
//       message,
//       room,
//     };
//   } else if ((!roomId, userId)) {
//     const room = await client.room.create({
//       data: { users: { connect: [{ id: loggedInUser.id}, {id: userId }] } },
//     });
//     console.log(userId)
//     console.log(loggedInUser.id)
//     console.log(room);
//     const message = await client.message.create({
//       data: {
//         payload,
//         user: { connect: { id: loggedInUser.id } },
//         room: { connect: { id: room.id } },
//       },
//     });
//     console.log(message);
//     return {
//       ok: true,
//       message,
//       room,
//     };
//   } else {
//     return {
//       ok: false,
//       error: "Cannot send the message.",
//     };
//   }
// };

export default {
  Mutation: {
    sendMessage: protectedResolver(sendMessageFn),
  },
};
