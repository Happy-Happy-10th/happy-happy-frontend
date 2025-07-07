export const getAppEnv = () => {
  return process.env.NEXT_PUBLIC_APP_ENV ?? APP_ENV_TYPE.DEV;
};

export const APP_ENV_TYPE = {
  PROD: "PROD",
  DEV: "DEV",
  LOCAL: "LOCAL",
} as const;
