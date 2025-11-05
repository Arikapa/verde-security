import { lazy } from "react";

// const UpdateDigitalSignature = lazy(() => import('../pages/digitalSignature/Update'));
const Update = lazy(() => import('../pages/Users/Update'));
/*

// 🔹 Signature (1:1) 
const UpdateDigitalSignature = lazy(() => import('../pages/digitalSignature/UpdateDigitalSignature'));  ✅

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 Devices (1:N) 
const ListDevices = lazy(() => import('../pages/devices/List'));     ❌
const CreateDevice = lazy(() => import('../pages/devices/Creat'));   ❌
const UpdateDevice = lazy(() => import('../pages/devices/Update'));   ❌

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 🔹 Security Answers (N:N) 
const ListAnswers = lazy(() => import('../pages/answers/ListAnswers'));     ❌
const CreateAnswer = lazy(() => import('../pages/answers/CreateAnswer'));   ❌
const UpdateAnswer = lazy(() => import('../pages/answers/UpdateAnswer'));   ❌

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*/

const coreRoutes = [

    
    {
        path: '/User/Update',
        title: 'Update USer',
        component: Update,
    },


    /*
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     // 🔹 FIRMA DIGITAL (1:1) 
    {
        path: '/UpdateDigitalSignature',
        title: 'Update Signature',
        component: UpdateDigitalSignature,
    },✅
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 🔹 DISPOSITIVOS (1:N) 
    {
        path: '/Devices',
        title: 'Devices List',
        component: ListDevices,
    },  ❌
    {
        path: '/CreateDevice',
        title: 'Create Device',
        component: CreateDevice,
    },  ❌
    {
        path: '/UpdateDevice/:id',
        title: 'Update Device',
        component: UpdateDevice,
    },  ❌
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 🔹 PREGUNTAS Y RESPUESTAS DE SEGURIDAD (N:N) 
    {
        path: '/Answers',
        title: 'Security Answers',
        component: ListAnswers,
    },  ❌
    {
        path: '/CreateAnswer',
        title: 'Create Security Answer',
        component: CreateAnswer,
    },  ❌
    {
        path: '/UpdateAnswer/:id',
        title: 'Update Security Answer',
        component: UpdateAnswer,
    },  ❌
    
    */
];

const routes = [...coreRoutes];
export default routes;

