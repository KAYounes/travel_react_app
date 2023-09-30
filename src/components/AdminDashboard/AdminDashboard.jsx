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
        // authenticator=''
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />  
      </IKContext>
    </Section>
  );
}

export default AdminDashboard;
