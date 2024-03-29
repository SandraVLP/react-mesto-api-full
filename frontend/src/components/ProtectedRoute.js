import React from 'react';
import { Navigate} from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  ...props
}) => {
  return (props.hasAccess ? <Component {...props}/> : <Navigate to="./signup" />)
}

export default ProtectedRoute;