import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import QdtComponents from "qdt-components";
import { useSession } from "../../context";

const QdtComponent = ({ type, app, qdtProps, className }) => {
  const ref = useRef();

  const sessions = useSession();
  const { qdtComponents } = app
    ? sessions.find(session => session.name === app)
    : sessions[0];

  useEffect(() => {
    qdtComponents.render(type, qdtProps, ref.current);

    return () => QdtComponents.unmountQdtComponent(ref.current);
  }, [ref, JSON.stringify(qdtProps)]);

  return <div className={className} ref={ref} />;
};

QdtComponent.propTypes = {
  /** Type of Qdt visualization, will usually be "QdtViz" */
  type: PropTypes.string,
  /** name of app to connect to, if it isn't the main app */
  app: PropTypes.string,
  /** config properties of QdtComponent, as defined https://github.com/qlik-demo-team/qdt-components#qdtviz */
  qdtProps: PropTypes.object,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default QdtComponent;
