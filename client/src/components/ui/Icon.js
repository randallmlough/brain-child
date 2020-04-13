import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faClock,
  faCircleNotch,
  faTimes,
  faHome,
  faTh,
  faCircle,
  faWindowMaximize,
  faBars,
  faTag,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faClock,
  faCircleNotch,
  faTimes,
  faHome,
  faTh,
  faCircle,
  faWindowMaximize,
  faBars,
  faTag,
  faPlus,
);

const Icon = (props) => {
  const { icon, variant = 'fas', ...rest } = props;
  return <FontAwesomeIcon icon={[variant, icon]} {...rest} />;
};

export default Icon;
