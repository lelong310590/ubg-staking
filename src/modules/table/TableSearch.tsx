import { FC, useRef, useState } from 'react'

import { TableStructureItem, ITableSearchProps } from './types';
import { ObjectUtils, ClassNames } from '../utils';
import { Icon } from '../icon';
import moduleConfig from '../../module.config';

interface Props extends ITableSearchProps {
  onActive: () => void,
  onOffSearch: () => void,
  structure: TableStructureItem[],
}

export const TableSearch: FC<Props> = (props) => {
  const inputRef: any = useRef(null);
  let delayCheckTyping: any;

  const { messages } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([] as any[]);
  const [indexSelect, setIndexSelect] = useState(-1);
  const isHasValue = !!ObjectUtils.getIn(inputRef, 'current.value');
  const [initSearch, setInitSearch] = useState(false);

  const handleChange = (e: any) => {
    clearTimeout(delayCheckTyping);
    const value = e.target.value;
    delayCheckTyping = setTimeout(async () => {
      if (inputRef && inputRef.current && inputRef.current.value === value) {
        if (value) {
          props.onActive();

          setIsLoading(true);
          setSearchResult([]);

          try {
            const data = await props.onFetchData(value) as any[];
            setSearchResult(data);
          } catch (error) { console.warn(`Table search box error: ${error.message}`) }

          setIsLoading(false);
          if (!initSearch) setInitSearch(true);
        } else {
          handleClear();
        }
      }
    }, 500);
  }

  const handleClear = () => {
    inputRef.current.value = '';
    setSearchResult([]);
    props.onOffSearch();
    setInitSearch(false);
  }

  const handleInputKeyDown = (e: any) => {
    // Up
    if (e.which === 38) {
      e.preventDefault();
      setIndexSelect(state => state === -1 ? state : state === 0 ? -1 : state - 1)
    }

    // Down
    if (e.which === 40) {
      e.preventDefault();
      setIndexSelect(state => state === -1 || searchResult.length - 1 === state ? 0 : state + 1);
    }
  }

  const handleSubmit = async (e?: any) => {
    if (e) e.preventDefault();
    const selectItem = searchResult[indexSelect];

    if (selectItem) {
      props.onSelect(selectItem);
    }
  }

  return (
    <form className={ClassNames({ Table__SearchBox: true, hasValue: isHasValue })} onSubmit={handleSubmit}>
      <div className="input">
        <div className="icon">
          <Icon.Search />
        </div>
        <input
          type="text"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
          placeholder={props.placeholder || 'Type to search'}
        />

        {isHasValue ? <div className="btnClear" onClick={handleClear}>
          <Icon.Remove />
        </div> : null}
      </div>

      {(() => {
        if (isLoading) {
          return <div className="Table__Message">
            <Icon.Loading />
            {moduleConfig.translate('loading-search-result')}
          </div>
        }

        if (initSearch && !searchResult.length) {
          if (messages && messages.emptyData) return <div className="Table__Message">
            {messages.emptyData({ q: inputRef.current.value })}
          </div>

          return <div className="Table__Message">
            {moduleConfig.translate('empty-data')}
          </div>
        }

        if (searchResult.length) return <div className="suggests">
          <table>
            <thead className="Table__Head">
              <tr>
                {props.structure.map((item, key) => {
                  return (
                    <th
                      key={key}
                      style={item.style}
                      className={ClassNames({ [item.className as string]: !!item.className })}
                    >
                      {item.name}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody className="Table__Body">
              {searchResult.map((item, itemKey) => {
                return (
                  <tr key={itemKey} className={item['_className']}>
                    {props.structure.map((column, columnKey) => {
                      return (
                        <td className={column.className || ''} style={column.style} key={columnKey}>
                          {(() => {
                            if (column.render) return column.render(item, handleSubmit, column);
                            if (column.key) return `${ObjectUtils.getIn(item, column.key, '')}`;
                            return '--';
                          })()}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      })()}
    </form>
  )
}