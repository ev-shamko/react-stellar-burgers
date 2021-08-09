import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
          children
        )
      }
    />
  );
} 
