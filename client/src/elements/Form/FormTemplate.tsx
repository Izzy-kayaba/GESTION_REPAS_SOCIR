import React, { useState, useEffect, ReactNode } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import style from "./Form.module.css"

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
