import regeneratorRuntime from "regenerator-runtime";
import React from 'react';
import Section from '../ui_components/wrappers/Section';
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'

function AdminDashboard() {
  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    console.log("Success", res);
  }

  return (
    <Section>
      <IKContext
        urlEndpoint='https://ik.imagekit.io/lgd9ykfw6/'
        publicKey='public_jYTemusiZpt+yCs8inkps77IdKo='
        // authenticationEndpoint={'/.netlify/functions/auth'}
        authenticator={authenticator}
      >
        <IKUpload
          onError={onError}
          onSuccess={onSuccess}
        />  
      </IKContext>
    </Section>
  );
}

export default AdminDashboard;

const authenticator = async () => {
  try {

      // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.
      const headers = {
        "Access-Control-Allow-Origin": "*"
      };

      const response = await fetch('/.netlify/functions/auth', {
          mode: 'no-cors',
          headers:  {"Access-Control-Allow-Origin": "*"}
      });

      console.log("response", response)

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }



      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
  } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
  }
};
