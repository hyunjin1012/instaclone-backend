import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

// const readMessageFn = async (_, { roomId }, { loggedInUser }) => {
//   await client.message.update({
//     where: { roomId, userId: { not: loggedInUser.id }, read: false },
//     data: { read: true },
//   });
// };

const readMessageFn = async (_, { id }, { loggedInUser }) => {
  const message = await client.message.findFirst({
    where: {
      id,
      userId: { not: loggedInUser.id },
      room: { users: { some: { id: loggedInUser.id } } },
    },
    select: {id: true}
  });
  // console.log(message);
  if (!message) {
    return {
      ok: false,
      error: "Message not found.",
    };
  } else
    await client.message.update({
      where: { id },
      data: { read: true },
    });
  return {
    ok: true,
  };
};

// {
//   const messagesToRead = await client.message.findMany({
//     where: {roomId, userId: {not: loggedInUser.id}, read: false}
//   })
//   console.log(messagesToRead)
//   if (messagesToRead) {
//     const read = await client.message.update({
//       where: {roomId, userId: {not: loggedInUser.id}, read: false},
//       data: {read: true}
//     })
//   }
// };

export default {
  Mutation: {
    readMessage: protectedResolver(readMessageFn),
  },
};
