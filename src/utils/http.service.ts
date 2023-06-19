import axios, { AxiosInstance } from "axios";
import { store } from "store";

class Http {
  private axios!: AxiosInstance;
  constructor() {
    this.initAxios();
  }

  private initAxios() {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}`,
      timeout: 30000,
      // headers: {
      //     'Content-Type': 'application/json',
      //     // Authorization: 'Basic cGxhbmRpZDpYenlzJXtKTl53OUFzQw==',
      // },
    });

    this.axios.interceptors.request.use(async (config: any) => {
      if (config.headers) {
        const getState = store?.getState();
        if (getState) {
          const { token = "" } = getState.auth;
          if (token && token.length > 0) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
          return config;
        }
        return config;
      }
      return config;
    });
  }

  post<T = any>(url: string, data: any) {
    return this.axios.post<T>(url, data);
  }

  put<T = any>(url: string, data: any) {
    return this.axios.put<T>(url, data);
  }

  patch<T = any>(url: string, data: any) {
    return this.axios.patch<T>(url, data);
  }
  delete<T = any>(url: string) {
    return this.axios.delete<T>(url);
  }

  get<T = any>(url: string, httpParams?: any) {
    const updatedParams = this.parseDateToTimeStamp(httpParams);
    for (const item in httpParams) {
      if (
        httpParams[item] === "" ||
        httpParams[item] === undefined ||
        httpParams[item] === null
      ) {
        delete httpParams[item];
      }
    }
    let finalParams: any;
    if (httpParams) {
      finalParams = updatedParams;
    }
    return this.axios.get<T>(url, { params: finalParams });
  }

  parseDateToTimeStamp(obj: any) {
    const newValueInstance = Object.assign({}, obj);
    (function isEmpty(data: any): boolean {
      if (typeof data === "object" && data !== null) {
        if (Array.isArray(data)) {
          data.forEach((item: any, index: number) => {
            if (isEmpty(item)) {
              data.splice(index, 1);
            }
          });
        } else {
          // eslint-disable-next-line array-callback-return
          Object.keys(data).map((key, index) => {
            if (data[key] instanceof Date) {
              data[key] = new Date(data[key]).toISOString();
            }
            // if (data[key] instanceof _moment) {
            //   data[key] = data[key].toDate().toISOString();
            // }
          });
        }
      }
      return data;
    })(newValueInstance);
    return newValueInstance;
  }
}
export const http = new Http();
