import React from 'react';
import SectionFluid from '../ui_components/wrappers/SectionFluid';
import Content from '../ui_components/wrappers/Content';
import Button from '../ui_components/buttons/Button';

export default function NoPageFound() {
  return (
    <SectionFluid>
      <Content mods='d-flex align-items-center justify-content-center vh-100 flex-column'>
        <p className="display-3 text-center text-uppercase">
          If you cannot navigate the internet then go read the newspaper
        </p>
        <Button to='./'>
          <i className="bi-thin bi-arrow-left-short fs-3 me-3"></i>
          Take Me Home Please
          </Button>
      </Content>
    </SectionFluid>
  );
}
