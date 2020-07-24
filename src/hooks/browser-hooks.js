import React from 'react';

export function usePageTitle(title) {
  return React.useLayoutEffect(() => {
    document.title = `${title} | ${process.env.REACT_APP_NAME}`;
  });
}
