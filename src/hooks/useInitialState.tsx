import { useDispatch, useSelector } from "react-redux";
import {
  initialLoadSelector,
  allStateSelector,
  updateInitialLoad,
} from "../redux-modules/settingsSlice";
import { useEffect } from "react";
import { AppDispatch } from "../redux-modules/store";
import { getSettings } from "../backend/utils";

export const useIsInitiallyLoading = () => useSelector(initialLoadSelector);

export const useSettingsState = () => useSelector(allStateSelector);

export const useFetchInitialStateEffect = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    getSettings().then((result: any) => {
      console.log(result);

      if (result.success) {
        const results = result.result || {};
        //@ts-ignore
        dispatch(updateInitialLoad(results));
      }
    });
  }, []);
};
