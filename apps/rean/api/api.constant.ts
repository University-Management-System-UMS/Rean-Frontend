export enum APIPath {
  LOGIN = "/login/validate",
  LOGOUT = "/api/logout",
  INSTITUTE = "/domain-mapping/search-institute",
  LEAVE = "/api/Leave/getAllleave/",
  PERIOD = "/api/Timetable/get",
  CREATELEAVE = "/api/Leave/crtLv",
  CANCEL_LEAVE = "/api/Leave/changeStus/",
  AllInterprise = "/api/rapplication/getAllEnterperises",
  LMS_TOKEN = "/api/login/get-lms-auth-token",
  LMS_AUTH = "/lms/auth",
}

export enum APIHTTPResponseCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
