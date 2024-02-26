import React from 'react';
import style from "../Card/Card.module.css"

// Define type for props
type Props = {
  title: string,
  text: string,
  footer?: string
}

// Arrow function component Card with destructured props
const Card = ({ title, text, footer }: Props) => {
  return (
    // Card container
    <div className={`card ${style.card}`} role="button">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
        {/* Footer if provided */}
        {footer && <small>{footer}</small>}
      </div>
    </div>
  );
}

// Export Card component as default
export default Card;
