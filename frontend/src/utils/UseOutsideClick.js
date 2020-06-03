import { useEffect } from 'react';

const UseOutsideClick = (ref, index, callback) => {
  const handleClick = e => {
    if (ref.current[index] && !ref.current[index].contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default UseOutsideClick;
