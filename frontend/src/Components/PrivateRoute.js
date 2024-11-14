// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = () => {
//     const token = localStorage.getItem('token');
//     return token !== null; // Check if token exists in localStorage
//   };

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated() ? ( // checks everytime if the user is autherised to go into a particular route 
//           <Component {...props} /> // if auth === true than the component will be rendered
//         ) : (
//           <Redirect to="/login" /> // Redirect to login if not authenticated
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Check if token exists in localStorage
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
