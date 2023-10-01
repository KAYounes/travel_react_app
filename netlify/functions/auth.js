// const ImageKit = require('imagekit');
import ImageKit from "imagekit";

export async function handler (event, context)
{
    console.log("Inside Auth")
    const imagekit = new ImageKit({
      urlEndpoint: 'https://ik.imagekit.io/lgd9ykfw6',
      publicKey: 'public_jYTemusiZpt+yCs8inkps77IdKo=',
      privateKey: 'private_H3sFP6kHVAlIkVKwf92WZZAQhDM='
    });

    let message = 'nothing';

  // const res = await imagekit.listFiles({skip : 0, limit : 10}, function(error, result) {message = error});
  // const data = await res
  // const res = await imagekit.listFiles({skip : 0, limit : 10})
  const res = await imagekit.deleteFile("6518860088c257da332fbb71")

//   console.log("Event", event, "context", context)

  // const res = imagekit.getAuthenticationParameters()
  // console.log(res)
  // console.log(JSON.stringify(res))

    return {
      statusCode: 200,
      // ok: true,
      body: JSON.stringify({res}),
    };
}