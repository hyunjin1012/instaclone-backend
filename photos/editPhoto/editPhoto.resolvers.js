import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const editPhotoFn = async (_, { id, file, caption }, { loggedInUser }) => {
  const { userId } = await client.photo.findUnique({ where: { id } });
  // console.log(userId);
  // console.log(id);
  // console.log(loggedInUser)
  if (userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "You cannot edit this photo.",
    };
  }
  const oldHashtags = await client.photo
    .findUnique({ where: { id } })
    .hashtags({ select: { hashtag: true } });
  // console.log(oldHashtags)
  if (oldHashtags) {
    const hashtagFreePhoto = await client.photo.update({
      where: { id },
      data: {
        hashtags: {
          disconnect: oldHashtags,
        },
      },
    });
    // console.log(hashtagFreePhoto)
  }

  let hashtagObj = [];
  if (caption) {
    hashtagObj = processHashtags(caption);
  }
  // console.log(hashtagObj)

  const editedPhoto = await client.photo.update({
    where: { id },
    data: {
      file,
      caption,
      hashtags: {
        connectOrCreate: hashtagObj,
      },

      // hashtags: {
      //   connectOrCreate: processHashtags(caption)
      // },

      // ...(hashtagObj.length>0 && {
      //   hashtags: {
      //     connectOrCreate: hashtagObj
      //   }
      // })
    },
  });
  // console.log(editedPhoto)
  if (editedPhoto) {
    return {
      ok: true,
      error: null,
      photo: editedPhoto,
    };
  } else {
    return {
      ok: false,
      error: "Could not edit photo",
    };
  }
};

export default {
  Mutation: {
    editPhoto: protectedResolver(editPhotoFn),
  },
};


//nico's


// export default {
//   Mutation: {
//     editPhoto: protectedResolver(
//       async (_, { id, caption }, { loggedInUser }) => {
//         const oldPhoto = await client.photo.findFirst({
//           where: {
//             id,
//             userId: loggedInUser.id,
//           },
//           select: {
//             hashtags: {
//               select: {
//                 hashtag: true
//               }
//             }
//           }
//           // include: {
//           //   hashtags: {
//           //     select: {
//           //       hashtag: true,
//           //     },
//           //   },
//           // },
//         });
//         if (!oldPhoto) {
//           return {
//             ok: false,
//             error: "Photo not found.",
//           };
//         }
//         const photo = await client.photo.update({
//           where: {
//             id,
//           },
//           data: {
//             caption,
//             hashtags: {
//               disconnect: oldPhoto.hashtags,
//               connectOrCreate: processHashtags(caption),
//             },
//           },
//         });
//         console.log(photo);
//         return {
//           ok: true,
//           photo: photo
//         };
//       }
//     ),
//   },
// }