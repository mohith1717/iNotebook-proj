import React from "react";

export const Alert = (props) => {
  return (
    <div>
      <div className="alert alert-primary" role="alert">
        {props.message}
        {/* <a href="#" class="alert-link">
          an example link
        </a>
        . Give it a click if you like. */}
      </div>
    </div>
  );
};
