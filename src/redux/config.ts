import { BACKEND_ROUTES } from "./routes";

type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";

type ApiConfig = {
  [outerKey: string]: {
    [innerKey: string]: {
      method: ApiMethod;
      path: string;
    };
  };
};

const API_METHOD: { [key in ApiMethod]: ApiMethod } = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
};

const apiConfig: ApiConfig = {
  user: {
    list: {
      method: API_METHOD.GET,
      path: `${BACKEND_ROUTES.USER}`,
    },
  },
} as const;

const apiTypes = Object.keys(apiConfig);

const apiNames: Array<string> = [];
for (let apiCollection of Object.values(apiConfig)) {
  apiNames.push(...Object.keys(apiCollection));
}


type ApiType = (typeof apiTypes)[number];
type ApiName = (typeof apiNames)[number];

const getApiConfig = (
  apiType: ApiType,
  apiName: ApiName
): { method: ApiMethod; path: string } => {
  const result = apiConfig?.[apiType]?.[apiName];

  if (!result) throw new Error("Invalid params for API Config");
  return result;
};

export default getApiConfig;
