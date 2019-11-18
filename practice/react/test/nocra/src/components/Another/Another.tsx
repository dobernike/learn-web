import React, { memo } from 'react';

function Another({ name }: { name: string }) {
  return <div>Hello {name}</div>;
}

export default memo(Another);
