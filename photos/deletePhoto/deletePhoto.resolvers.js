import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

const deletePhotoFn = async (_, {id}, {loggedInUser}) => {
  const photo = await client.photo.findUnique({where: {id}, select: {userId:true}})
  // console.log(photo)
  if(!photo) {
    return {
      ok: false,
      error: "Photo not found."
    }
  } else
  if (photo.userId === loggedInUser.id) {

    const deletedlikes = await client.like.deleteMany({
      where: {photoId:id}
    })
    
    const deletedComments = await client.comment.deleteMany({
      where: {photoId: id}
    })

    
    //hashtags:
//     //아래와 같이 끝내고 싶지만 photoId는 유니크가 아니므로 패쓰..
// await client.photo.update({where:{id:1},data:{hashs:{disconnect:{photoId:1}}}})

// //지울 hashid 골라내기
// const hashIds = photo.hashs.map((hash) => ({ id: hash.id }));

// //해쉬 디스커넥
// await client.photo.update({
// where: { id },
// data: { hashs: { disconnect: hashIds } },
// });

// //포토 없는 해쉬 골라내기
// const noPhotos = hashIds.filter(async (hashId) => {
// const hash = await client.hash.findFirst({
// where: { id: hashId.id },
// select: { photos: { select: { id: true } } },
// });
// return hash.photos.length === 0;
// });

// //그리고 해쉬 지우기
// await client.hash.deleteMany({ where: { OR: noPhotos } });

    const deletedPhoto = await client.photo.delete({
      where: {id},
    })
    // const transaction = await prisma.$transaction([deletedPhoto, deletedComments])
    // console.log(deletedPhoto)
    if (deletedPhoto) {
      return {
        ok: true,
        error: null
      }
    } else {
      return {
        ok: false,
        error: "Photo not deleted."
      }
    }
  } else {
    return {
      ok: false,
      error: "You cannnot delete this photo."
    }
  }
}

export default {

  Mutation: {
    deletePhoto: protectedResolver(deletePhotoFn)
  }
}

//nico's

// export default {
//   Mutation: {
//     deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
//       const photo = await client.photo.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           userId: true,
//         },
//       });
//       if (!photo) {
//         return {
//           ok: false,
//           error: "Photo not found.",
//         };
//       } else if (photo.userId !== loggedInUser.id) {
//         return {
//           ok: false,
//           error: "Not authorized.",
//         };
//       } else {
//         await client.photo.delete({
//           where: {
//             id,
//           },
//         });
//         return {
//           ok: true,
//         };
//       }
//     }),
//   },
// };