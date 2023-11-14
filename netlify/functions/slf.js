/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import ImageKit from "imagekit";

export async function handler(event, context) {
  const imagekit = new ImageKit({
    urlEndpoint: "https://ik.imagekit.io/lgd9ykfw6",
    publicKey: process.env.IK_PRIVATE_KEY,
    privateKey: "private_H3sFP6kHVAlIkVKwf92WZZAQhDM=",
  });

  try {
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
    // console.log('-----------------------------------------------------------------------------------------')
    // console.log(process.env.IK_PRIVATE_KEY)
    // console.log('-----------------------------------------------------------------------------------------')

    switch (queryStringParameters.action) {
      case "getFileDetails":
        break;

      case "listAndSearchFiles":
        response = await handleAPICall(
          imagekit.listFiles,
          queryStringParameters
        );
        break;

      case "auth":
        console.log("auth");
        response = imagekit.getAuthenticationParameters();
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }

      case "upload":
        // response = imagekit.upload({...queryStringParameters})
        // return{
        //   statusCode: 200,
        //   body: JSON.stringify(response)
        // }
        response = handleAPICall(imagekit.upload, {...queryStringParameters})
        return response
        break;

      default:
        return { statusCode: 400, body: JSON.stringify({response: 'Action unknown'})};
    }
  } catch (error) {
    console.log("\n\n -------------------- \nerror> ", error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }

  ////
  function handleAPICall(api, params) {
    console.log("\n\n API:");

    return api.call(imagekit, params)
      .then(function (response) {
        console.log("-- Response: ", response);
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        };
      })
      .catch(function (error) {
        console.log("-- Error: ", error);
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        };
      });
  }
}
