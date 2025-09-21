'use client';

import React from 'react';
import MainLoginInputs from './MainLoginInputs';

export default function SplitCardLoginForm({
  loginBgImg = '',
  appLogo = '',
  appName = 'App',
  showResetLink = false,
  changePasswordUrl = '#',
  showCreateAccount = false,
  registerUrl = '#',
}) {
  return (
    <div className="row justify-content-center col-md-12 p-0 m-0">
      <div className=" shadow-lg col-md-8 p-0 m-3 row justify-content-center ">
        <div className="col-md-6 d-lg-block p-0 m-0  d-none">
          <div
            className="p-0 m-0 col-md-12"
            style={{ backgroundImage: `url('${loginBgImg}'); min-height:100vh;background-repeat:no-repeat;background-size:cover;background-position:center` }}
          />
        </div>

        <div className="col-md-6 p-0 m-0 row justify-content-center " style={{minHeight:"100vh"}}> 
          <div className="col-md-10 p-lg-0 m-0 pt-5 row justify-content-center  ">
            <MainLoginInputs
              showCreateAccount={showCreateAccount}
              appName={appName}
              appLogo={appLogo}
              showResetLink={showResetLink}
              changePasswordUrl={changePasswordUrl}
              registerUrl={registerUrl}
            />
            <div className="" id="alert_box" />
          </div>
        </div>
      </div>

    </div>
  );
}
