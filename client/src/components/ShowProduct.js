import React from "react";

import { useLocation } from "react-router-dom";

export default React.memo(function ShowProduct() {
  let location = useLocation();

  return (
    <div>
      <h1>Show product</h1>

      <h4>{location.state.title}</h4>
      <h4>{location.state.price}</h4>
      <h4>{location.state.description}</h4>
      {/* <h3>And the biggest yet is: {location.productData}</h3> */}

      {console.log(location)}
    </div>
  );
});
