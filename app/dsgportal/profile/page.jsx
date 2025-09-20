import { Suspense } from 'react';

import Profile from '../uiControl/Profile';

import { InteprateEvent } from '../dataControl/RequestHandler';

import { hiveRoutes } from '../../../appConfigs/hiveRoutes';

export async function generateMetadata({ searchParams }) {
  const mosyTitle = " "//searchParams?.mosyTitle || "";

  return {
    title: mosyTitle ? decodeURIComponent(mosyTitle) : ``,
    description: 'dsgportal ',
    
    icons: {
      icon: `${hiveRoutes.hiveBaseRoute}/logo.png`
    },    
  };
}    
                      

export default function MainProfilePage() {

   return (
     <>
       <div className="main-wrapper">
          <div className="page-wrapper">
             <div className="content container-fluid p-0 m-0 ">
               <Suspense fallback={<div className="col-md-12 p-5 text-center h3">Loading...</div>}>
                 <Profile 
                    dataIn={{ parentUseEffectKey: "initProfile" }} 
                                           
                    dataOut={{
                       setChildDataOut: InteprateEvent
                    }}   
                    
                 />
               </Suspense>
             </div>
           </div>
         </div>
       </>
     );
}