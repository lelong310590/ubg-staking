export interface ILocale {
  key: string,
  label: string,
  isActive: boolean
}

export interface IModuleConfig {
  translate: (id: string, values?: any) => string,
  getLocaleList: () => ILocale[]
}