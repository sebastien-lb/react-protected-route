// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export type ProtectedRouteProps<R extends string = string> = {
  role: R
  routeProps: RouteProps
  authorizations: { [k in R]: { redirect?: string; authorizations: string[] } }
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = <R extends string = string>(
  props: ProtectedRouteProps<R>
): JSX.Element => {
  const { role, routeProps, authorizations } = props
  if (!(role in authorizations)) {
    throw new Error(`provide role: ${role} does not exist in authorizations`)
  }
  if (!(routeProps && routeProps.path && routeProps.component)) {
    throw new Error(`you need to provide routeProps.path to protectedRoute`)
  }
  return routeProps.path in authorizations[role] ? (
    <Route {...routeProps} />
  ) : (
    <Redirect to={authorizations[role].redirect || '/'} />
  )
}

export default ProtectedRoute
