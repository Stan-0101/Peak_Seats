import { useState } from 'react';

const useNavBarToggle = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setIsCollapsed(true);
    }
  };

  return {
    isCollapsed,
    handleNavClick,
    handleToggleClick
  };
};

export default useNavBarToggle;
