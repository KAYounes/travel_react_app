const ImageKit = require('imagekit');
// import 

export async function handler (event, context)
{
    console.log("Inside Auth")
//   console.log("Event", event, "context", context)

  const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/lgd9ykfw6',
    publicKey: 'public_jYTemusiZpt+yCs8inkps77IdKo=',
    privateKey: 'private_H3sFP6kHVAlIkVKwf92WZZAQhDM='
  });

  const res = imagekit.getAuthenticationParameters()
  console.log(res)
  console.log(JSON.stringify(res))
//   const data = await res.json()
//   console.log("data", data)

    return {
      statusCode: 200,
      ok: true,
      body: JSON.stringify(res),
    };
}