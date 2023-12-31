import ImageKit from "imagekit";

export async function handler(event, context) {
  const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/lgd9ykfw6",
    publicKey: "public_jYTemusiZpt+yCs8inkps77IdKo=",
    privateKey: "private_H3sFP6kHVAlIkVKwf92WZZAQhDM=",
  });

  const { headers, httpMethod, queryStringParameters, body } = event;
  let response;

  // console.log(event)
  // console.log('--------------------------')
  // console.log(headers)
  // console.log('--------------------------')
  // console.log(httpMethod)
  // console.log('--------------------------')
  // console.log(queryStringParameters)
  // console.log('--------------------------')
  // console.log(body)

  switch (queryStringParameters.action) {
    case "getFileDetails":
      if (!queryStringParameters.fileId) return { statusCode: 400 };
      response = await imagekit.getFileDetails("651a931e88c257da336a0eb6");

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };

    case "listFiles":
      response = await imagekit.listFiles(queryStringParameters);

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };

    case "auth":
      console.log("auth");
      response = imagekit.getAuthenticationParameters();

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };

    case "upload":
      break;

    default:
      return { statusCode: 400 };
  }
}
