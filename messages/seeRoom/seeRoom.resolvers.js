import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const seeRoomFn = async (_, {roomId}, {loggedInUser}) =>  await client.room.findFirst({
    where: {id: roomId, users: {some: {id: loggedInUser.id}}}
  })
  // console.log(myRoom)
  // if (!myRoom) {
  //   return {
  //     ok: false,
  //     error: "You're not a member of this room."
  //   }
  // } 
  // const messages = await client.message.findMany({
  //   where: {roomId: myRoom.id}
  // })
  // console.log(messages)
  // const users = await client.room.findUnique({where: {id: myRoom.id}}).users()
  // console.log(users)
  // return {
  //   ok: true,
  //   error: null,
  //   room: myRoom,
  //   users,
  //   messages,
  // }


export default {
  Query: {
    seeRoom: protectedResolver(seeRoomFn)
  }
}