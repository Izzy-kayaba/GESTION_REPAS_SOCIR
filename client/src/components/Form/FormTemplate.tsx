import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FormTemplate: React.FC<Props> = ({ children }) => {

  return (
    <div className="p-4">
        {children}
    </div>
  )
}

export default FormTemplate;
