import getNextConfig from 'next/config';
import { DefaultEnvs } from '../default.env';

const { publicRuntimeConfig } = getNextConfig();

export const getEnv = (key: keyof typeof DefaultEnvs) => publicRuntimeConfig[key]
export const isDev = getEnv('ENV') === 'local';
