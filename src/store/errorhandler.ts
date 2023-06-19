import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toastService } from "utils/toast.service";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    console.log(action);

    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action.payload && action.payload.response) {
        toastService.showToast(action.payload.response.data.message);
      } else {
        toastService.showToast(action.payload.message);
      }
    }

    return next(action);
  };
