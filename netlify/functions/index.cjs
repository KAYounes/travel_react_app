const ImageKit = require('imagekit');

exports.handler = async function (event, context) {
  const date = new Date()
  console.log("Event", event, "context", context)

  // const imagekit = new ImageKit({
  //   urlEndpoint: 'https://ik.imagekit.io/lgd9ykfw6',
  //   publicKey: 'public_jYTemusiZpt+yCs8inkps77IdKo=',
  //   privateKey: 'private_H3sFP6kHVAlIkVKwf92WZZAQhDM='
  // });

  // const res = imagekit.getAuthenticationParameters()
  // console.log(res)
  // const data = await res.json()

    return {
      statusCode: 200,
      body: JSON.stringify({message: date.getSeconds()}),
    };
  };