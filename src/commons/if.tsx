import React from 'react';

interface Props {
  test: boolean;
  children: JSX.Element;
}

export default ({ test, children }: Props) => {
  if (test) {
    return children;
  }
  return <div />;
};
