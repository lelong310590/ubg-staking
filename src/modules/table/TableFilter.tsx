import { FC, memo, useState } from 'react'

import { TableFilterProps } from './types'
import { isEqual } from '../utils'
import { Icon } from '../icon'
import moduleConfig from '../../module.config'
import { TableButton } from './TableButton'
// import { Button } from 'components'

interface Props extends TableFilterProps {
  onSubmit: (params: any) => any
}

export const TableFilter: FC<Props> = memo((props) => {
  const { structure, type } = props;
  const [params, setParams] = useState(structure.reduce((output, item) => {
    if (item.defaultValue) {
      const defaultValue = item.defaultValue;
      if (typeof defaultValue === 'object') output = { ...output, ...defaultValue }
      else output = { ...output, [item.key || '']: defaultValue }
    }
    return output;
  }, {}) as any)
  const [isShowPopup, setIsShowPopup] = useState(false);
  const id = `TableFilter__Popup${Date.now()}`;

  const handleSubmit = async (p = params) => {
    await props.onSubmit(p);
    setIsShowPopup(false);
  };

  const handleReset = async () => {
    const temp = structure.reduce((output: any = {}, item) => {
      output[item.key] = '';
      return output;
    }, {})

    await props.onSubmit(temp);

    setParams({});
    setIsShowPopup(false);
  };

  const handleClear = async (paramKey: string) => {
    const temp = { ...params, [paramKey]: '' };
    setParams(temp);
    await props.onSubmit(temp);
  }

  const qtyFilterActive = structure.filter(v => typeof params[v.key] !== 'undefined' && params[v.key] !== '').length;

  return (
    <div className={`Table__Filter ${type}`}>
      {(() => {
        return <>
          <div className="Table__Filter__Pannel">
            <div className="button" onClick={() => setIsShowPopup(true)}>
              <Icon.Filter />
              {moduleConfig.translate('filter-box')}

              {qtyFilterActive ? <div className="qty">
                {qtyFilterActive}
              </div> : null}
            </div>

            {type === 'popup' ? structure.filter(v => params[v.key]).map((item, key) => (
              <div className="paramItem" key={key}>
                {item.name}: {item.renderValue ? item.renderValue(params[item.key]) : `${params[item.key]}`}
                <div className="btnRemove" onClick={() => handleClear(item.key)}>
                  <Icon.Remove />
                </div>
              </div>
            )) : null}

            {type === 'panel' ? <div className="panelList">
              {structure.map((item, key) => {
                return (
                  <div key={key} className="item">
                    <div className="label">{item.name}</div>
                    <item.input
                      paramKey={item.key || ''}
                      onChange={(value) => {
                        setParams((state: any) => {
                          const newParams = { ...state, [item.key]: value };
                          handleSubmit(newParams)
                          return newParams;
                        });
                      }}
                      params={params}
                      value={params[item.key]}
                    />
                  </div>
                )
              })}

              {qtyFilterActive ? <div className="item reset">
                <div className="label">Action</div>
                <TableButton label={moduleConfig.translate('filter-reset')} onClick={handleReset} />
              </div> : null}
            </div> : null}
          </div>

          {isShowPopup && type === 'popup' ? <div className="Table__Filter__Popup" id={id} onClick={(e: any) => e.target.id === id ? setIsShowPopup(false) : null}>
            <div className="content">
              <div className="head">
                <div className="title">
                  {moduleConfig.translate('filter-box')}
                </div>
                <div className="btnClose" onClick={() => setIsShowPopup(false)}>
                  <Icon.Close />
                </div>
              </div>
              <div className="list">
                {structure.map((item, key) => {
                  return (
                    <div key={key} className="item">
                      <div className="label">{item.name}</div>
                      <item.input
                        paramKey={item.key || ''}
                        onChange={(value) => setParams((state: any) => ({ ...state, [item.key]: value }))}
                        params={params}
                        value={params[item.key]}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="btnActions">
                <TableButton label={moduleConfig.translate('filter-reset')} onClick={handleReset} isVisible={!!qtyFilterActive} className="negative" />
                <TableButton label={moduleConfig.translate('filter-submit')} onClick={handleSubmit} />
              </div>
            </div>
          </div> : null}

        </>
      })()}
    </div>
  )
}, (prev, next) => isEqual(prev.structure, next.structure))

TableFilter.defaultProps = {
  type: 'popup'
}