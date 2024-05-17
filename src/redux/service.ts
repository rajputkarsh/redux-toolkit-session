import Axios, { AxiosResponseHeaders } from "axios";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

export type ServiceParam = {
  method: ApiMethod;
  path: string;
  data: { [key: string]: any };
  headers: { [key: string]: any } | null;
  timeout: number;
};

export type FetchDataResponse = {
  data: Object | null;
  headers: Partial<AxiosResponseHeaders>;
  status: number;
};

const axios = Axios.create({
  responseType: "json",
});

export const fetchData = ({
  method,
  path,
  data,
  headers,
  timeout = 30000,
}: ServiceParam): Promise<FetchDataResponse> => {
  const requestConfig: { [key: string]: any } = {
    url: path,
    method: method,
    ...(method !== "GET" ? data : {}),
    ...(timeout ? { timeout } : {}),
    headers: {
      "content-type": "application/json",
    },
  };

  if (headers) {
    requestConfig["headers"] = {
      ...headers,
    };
  }

  requestConfig["headers"] = {
    ...requestConfig["headers"],
  };

  if (method === "GET") {
    requestConfig["params"] = data;
  } else {
    requestConfig["data"] = data;
  }

  return new Promise((resolve, reject) => {
    axios(requestConfig)
      .then((response: any) => {
        if (response.status >= 200 && response.status <= 299) {
          resolve({
            data: response.data,
            status: response.status,
            headers: response.headers,
          });
        } else {
          if (response.status === 401) {
            alert(`Authorization failed`);
          } else {
            const error = new Error();
            reject(error);
          }
        }
      })
      .catch((error: any) => {
        if (error.code === "ERR_NETWORK") {
          // frontend offline or backend not working
          alert("Something went wrong");
        } else if (error?.response?.status === 401) {
          alert(`Authorization failed`);
        } else {
          reject(error?.response?.data || error);
        }
      });
  });
};
