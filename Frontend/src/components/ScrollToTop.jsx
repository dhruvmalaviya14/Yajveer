import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [pathname, navigationType]);

  return null;
}