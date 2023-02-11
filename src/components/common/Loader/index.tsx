import { FC } from "react";
import loader from "/src/assets/images/loader.gif";

import "./styles.scss";

const Loader: FC = () => {
  return (
    <div className="overlay">
      <img src={loader} className="loader" />
    </div>
  );
};

export default Loader;
