import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef(
  ({ children, showLabel, hideLabel }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    useImperativeHandle(ref, () => {
      return { toggleVisibility };
    });
    return (
      <>
        {isVisible ? (
          <>
            {hideLabel ? (
              <button onClick={toggleVisibility}>{hideLabel}</button>
            ) : null}
            {children}
          </>
        ) : (
          <button onClick={toggleVisibility}>{showLabel}</button>
        )}
      </>
    );
  }
);

Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
