import { forwardRef, memo } from 'react'

import { ETableSortDefaultValue, TableRef, TableProps } from './types'
import { useTable } from './useTable'
import { ObjectUtils, ClassNames } from '../utils'
import { TableFilter } from './TableFilter'
import { TableSearch } from './TableSearch'
import { TablePagination } from './TablePagination'
import { Icon } from '../icon'
import moduleConfig from '../../module.config'

export const Table = memo(forwardRef<TableRef, TableProps>((props, ref) => {
  const { state, fetchData, setIsSearchBoxActive, isSearchBoxActive, sortObj, messages } = useTable(props, ref);

  return (
    <div className={ClassNames({ Table: true, [props.className as string]: props.className })}>

      {!!props.searchBox && <TableSearch
        {...props.searchBox}
        structure={props.structure}
        onActive={() => setIsSearchBoxActive(true)}
        onOffSearch={() => setIsSearchBoxActive(false)}
      />}

      {(!isSearchBoxActive && props.filter && props.filter.structure.length) && <TableFilter
        {...props.filter}
        onSubmit={(params) => fetchData({ params })}
      />}

      {!isSearchBoxActive && <>
        <table>
          <thead className="Table__Head">
            <tr>
              {props.structure.map((item, key) => {
                const enableSort = !!item.sort;
                const sortKey = ObjectUtils.getIn(item, 'key') || ObjectUtils.getIn(item, 'sort.key');
                const sortValue = state.params[sortKey];

                const increaseValue = ObjectUtils.getIn(item, 'sort.increaseValue', ETableSortDefaultValue.INCREASE);
                const isIncrease = sortValue === increaseValue;

                const descreaseValue = ObjectUtils.getIn(item, 'sort.descreaseValue', ETableSortDefaultValue.DESCREASE);
                const isDescrease = sortValue === descreaseValue;

                return (
                  <th
                    key={key}
                    style={item.style}
                    className={ClassNames({
                      [item.className as string]: !!item.className,
                      enableSort,
                      increase: isIncrease,
                      descrease: isDescrease,
                    })}
                    onClick={() => {
                      if (enableSort) {
                        if (isDescrease) return fetchData({ params: { ...sortObj, [sortKey]: increaseValue } })
                        return fetchData({ params: { ...sortObj, [sortKey]: descreaseValue } })
                      }
                    }}
                  >
                    {item.name}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody className="Table__Body">
            {(() => {
              if (!state.data) return null

              return state.data.map((item, itemKey) => {
                item['_order'] = (state.pagination.pageNumber - 1) * state.pagination.itemsPerPage + itemKey + 1;

                return (
                  <tr key={itemKey} className={item['_className']}>
                    {props.structure.map((column, columnKey) => {
                      return (
                        <td className={column.className || ''} style={column.style} key={columnKey}>
                          {(() => {
                            if (column.render) return column.render(item, fetchData, column);
                            if (column.key) return `${ObjectUtils.getIn(item, column.key, '')}`;
                            return '--';
                          })()}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            })()}
          </tbody>
        </table>

        {function () {
          if (state.count === -1) return <div className="Table__Message">
            <Icon.Loading />
            {moduleConfig.translate('fetching-data')}
          </div>

          if (state.error) {
            if (messages && messages.error) return <div className="Table__Message">
              {messages.error(state.error)}
            </div>

            return <div className="Table__Message">
              <Icon.Error />
              {state.error}
            </div>
          }

          if (!state.count || !state.data.length) {
            if (messages && messages.emptyData) return <div className="Table__Message">
              {messages.emptyData(state.params)}
            </div>

            return <div className="Table__Message">
              <Icon.Data />
              {moduleConfig.translate('no-data')}
            </div>
          }
        }()}

        {state.count && state.count !== -1 ? <TablePagination fetchData={fetchData} state={state} /> : null}
      </>}
    </div>
  )
}), (prevProps) => {
  if (!prevProps.enableReinitialize) return true
  return false
})