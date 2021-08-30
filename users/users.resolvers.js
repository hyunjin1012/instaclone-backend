import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({id}, _, {loggedInUser}) => {
      if (!loggedInUser) {
        return false;}
      //mine
      // const ok = await client.user.findUnique({where: {id}}).followers({where: {id: loggedInUser.id}});
      // console.log(ok);
      
      // return ok ? true : false 
      
      //nico's
      // const exists = await client.user.findUnique({where: {username: loggedInUser.username}}).following({where: {id}})
      // return exists.length !== 0

      //nico's second method

      const exists = await client.user.count({where: {username: loggedInUser.username, following: {some : {id}}}})
      console.log(exists)
      return Boolean(exists)

    },
    photos: async ({id}, {page}, {loggedInUser}) => await client.user.findUnique({where: {id}}).photos({skip: (page -1) * 5, take: 5})
  }
}
