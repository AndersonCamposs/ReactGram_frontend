// REDUX
import { resetMessage } from '../slices/photoSlice';

export const useResetComponentMessage = (dispatch, setTrigger) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
      setTrigger((prevState) => !prevState);
    }, 2000);
  };
};
