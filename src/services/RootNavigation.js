import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(name) {
  navigationRef.current?.reset({index: 0, routes: [{name}]});
}

export function dispatchNav(action) {
  navigationRef.current?.dispatch(action);
}

export function goBack() {
  navigationRef.current?.goBack();
}
