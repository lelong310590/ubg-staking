import { IModuleConfig } from "./modules/types";
import { ELocale } from "./AppTypes";
import { translate } from "./AppLanguages";

const moduleConfig: IModuleConfig = {
  translate: (id: string, values?: any) => translate(id, values),
  getLocaleList: () => [
    {
      key: ELocale.ENGLISH,
      label: 'ENG',
      isActive: true,
    },
    {
      key: ELocale.VIETNAM,
      label: 'VN',
      isActive: true,
    }
  ]
}

export default moduleConfig;