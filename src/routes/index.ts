import { lazy } from "react";


const Update = lazy(() => import('../pages/Users/Update'));
const CreateUser = lazy(() => import('../pages/Users/Create'));
const ListUsers = lazy(() => import('../pages/Users/List'));
const CreateDevice = lazy(() => import('../pages/devices/Create'));
const UpdateDevice = lazy(() => import('../pages/devices/Update'));
const ListDevices = lazy(() => import('../pages/devices/List'));
const CreateDigitalSignature = lazy(() => import('../pages/digitalSignature/Create'));
const UpdateDigitalSignature = lazy(() => import('../pages/digitalSignature/Update'));
const ListDigitalSignatures = lazy(() => import('../pages/digitalSignature/List'));
const CreateSecurityQuestion = lazy(() => import('../pages/securityQuestions/Create'));
const UpdateSecurityQuestion = lazy(() => import('../pages/securityQuestions/Update'));
const ListSecurityQuestions = lazy(() => import('../pages/securityQuestions/List'));
const CreateAnswer = lazy(() => import('../pages/answer/Create'));
const UpdateAnswer = lazy(() => import('../pages/answer/Update'));
const ListAnswers = lazy(() => import('../pages/answer/List'));



const coreRoutes = [
    {   path: "/user/create", 
        title: "Crear Usuario", 
        component: CreateUser },

    {   path: "/user/update/:id", 
        title: "Actualizar Usuario", 
        component: Update },

    {   path: "/user/list", 
        title: "Usuarios", 
        component: ListUsers },


    {   path: "/device/create", 
        title: "Crear Dispositivo", 
        component: CreateDevice },

    {   path: "/device/update/:id", 
        title: "Actualizar Dispositivo", 
        component: UpdateDevice },
    {   path: "/device/list", 
        title: "Dispositivos", 
        component: ListDevices },

    {   path: "/digitalSignature/create", 
        title: "Crear Firma", 
        component: CreateDigitalSignature },

    {   path: "/digitalSignature/update/:id", 
        title: "Actualizar Firma", 
        component: UpdateDigitalSignature },

    {   path: "/digitalSignature/list", 
        title: "Firmas", 
        component: ListDigitalSignatures },

    {   path: "/securityQuestion/create", 
        title: "Crear Pregunta", 
        component: CreateSecurityQuestion },

    {   path: "/securityQuestion/update/:id", 
        title: "Actualizar Pregunta", 
        component: UpdateSecurityQuestion },

    {   path: "/securityQuestion/list", 
        title: "Preguntas", 
        component: ListSecurityQuestions },

    {   path: "/answer/create", 
        title: "Crear Respuesta", 
        component: CreateAnswer },

    {   path: "/answer/update/:id", 
        title: "Actualizar Respuesta", 
        component: UpdateAnswer },

    {   path: "/answer/list", 
        title: "Respuestas", 
        component: ListAnswers },
];

const routes = [...coreRoutes];
export default routes;

