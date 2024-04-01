import { useEffect } from "react";
import { setPageNumber } from "./features/pageSlice";
import { useDispatch } from "react-redux";

function usePageNumber(num) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageNumber(num));
  }, [dispatch, num]);
}

export default usePageNumber;
