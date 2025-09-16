import { useEffect } from "react"

const useClickOutsideElement = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) callback();
            }
        
        document.addEventListener("click", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
    }, [ref, callback])
  return
}

export default useClickOutsideElement