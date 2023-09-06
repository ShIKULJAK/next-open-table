// import axios from 'axios';
// import { deleteCookie, getCookie } from 'cookies-next';
// import { useContext } from 'react';
// import { AuthenticationContext } from '../app/context/AuthContext';

// const useAuth = () => {
//   const { setAuthState } = useContext(AuthenticationContext);

//   const signin = async (
//     {
//       email,
//       password,
//     }: {
//       email: string;
//       password: string;
//     },
//     handleClose: () => void
//   ) => {
//     setAuthState({
//       data: null,
//       error: null,
//       loading: true,
//     });
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/signin',
//         {
//           email,
//           password,
//         }
//       );
//       //   console.log(response);
//       setAuthState({
//         data: response.data,
//         error: null,
//         loading: false,
//       });
//       handleClose();
//     } catch (error: any) {
//       setAuthState({
//         data: null,
//         error: error.response.data.errorMessage,
//         loading: false,
//       });
//     }
//   };
//   const signup = async (
//     {
//       email,
//       password,
//       firstName,
//       lastName,
//       city,
//       phone,
//     }: {
//       email: string;
//       password: string;
//       firstName: string;
//       lastName: string;
//       city: string;
//       phone: string;
//     },
//     handleClose: () => void
//   ) => {
//     setAuthState({
//       data: null,
//       error: null,
//       loading: true,
//     });
//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/signup',
//         {
//           email,
//           password,
//           firstName,
//           lastName,
//           city,
//           phone,
//         }
//       );
//       //   console.log(response);
//       setAuthState({
//         data: response.data,
//         error: null,
//         loading: false,
//       });
//       handleClose();
//     } catch (error: any) {
//       setAuthState({
//         data: null,
//         error: error.response.data.errorMessage,
//         loading: false,
//       });
//     }
//   };

//   // const signout = () => {
//   //   deleteCookie('jwt');
//   // };

//   // setAuthState({
//   //   data: null,
//   //   error: null,
//   //   loading: false,
//   // });

//   const signout = () => {
//     deleteCookie('jwt');

//     setAuthState({
//       data: null,
//       error: null,
//       loading: false,
//     });
//   };

//   return {
//     signin,
//     signup,
//     signout,
//   };
// };

// export default useAuth;

import axios from 'axios';
import { getCookie, deleteCookie, getCookies } from 'cookies-next';
// import Cookies from 'js-cookie';

import { useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signout = () => {
    deleteCookie('jwt');
    // Cookies.remove('jwt');

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
