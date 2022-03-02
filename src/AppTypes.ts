import { FC } from "react";

export type TDeviceType = 'Desktop' | 'Mobile' | 'Tablet' | 'None'

export interface IDevice {
  type: TDeviceType,
  browser: string,
  version: string,
  os: string,
  platform: string,
  isiPhone: boolean,
  source: string,
}

export enum ELocale {
  ENGLISH = 'en_US',
  VIETNAM = 'vi_VN',
  JAPAN = 'ja_JP',
  THAILAN = 'th_TH',
  INDONESIA = 'id_ID',
  MALAYSIA = 'ms_MY',
  CHINA = 'zh_CN',
  KHMER = 'km',
}

export interface IHead {
  title?: string,
  thumbnailURL?: string,
  webURL?: string,
  description?: string,
  siteName?: string,
  type?: string,
  favicon?: string,
}

export interface IRender {
  head?: IHead,
  className?: string,
  mobile?: FC<any>,
  desktop?: FC<any>,
  tablet?: FC<any>,
}

export interface ResponseState<T> {
  data: T | null,
  error?: string,
  isFetched: boolean,
}