import React from 'react';
import clsx from 'clsx'
import bootstrap from '/bootstrap.bundle.min.js'

export default function Toast() {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <div className={clsx('toast', show && 'show')}>
  <div className="toast-header">
    {/* <img src="..." className="rounded me-2" alt="..."> */}
    <strong className="me-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
  </div>
  <div className="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>
    </>
  );
}
