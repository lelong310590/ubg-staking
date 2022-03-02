import { useState, useEffect, useImperativeHandle } from "react";

import { TableProps, TableState, TableFuncFetchData, TableRef } from "./types";
import { ObjectUtils } from "../utils";

export const useTableState = (props: TableProps) => {
  const defaultState: TableState = {
    isFetchingData: false,
    count: -1,
    data: [],
    error: '',
    params: props.filter ? props.filter.structure.reduce((output: any = {}, item) => {
      if (item.defaultValue) {
        const defaultValue = item.defaultValue;
        if (typeof defaultValue === 'object') output = { ...output, ...defaultValue }
        else output[item.key || ''] = defaultValue
      }
      return output;
    }, {}) : {},
    pagination: {
      pageNumber: 1,
      itemsPerPage: props.itemPerPages || 10,
    },
  }

  const [state, setState] = useState(defaultState);

  return {
    state,
    setState,
    defaultState,
  }
}

export const useTable = (props: TableProps, ref: any) => {
  const { state, setState, defaultState } = useTableState(props);
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false);

  // ======================= Functions =======================
  const fetchData: TableFuncFetchData = async (parameters) => {
    try {
      if (state.isFetchingData || !props.onFetchData) return;

      if (parameters?.isForceUpdate) setState(defaultState);
      else setState({ ...state, isFetchingData: true });

      let pagination = { ...state.pagination, ...ObjectUtils.getIn(parameters, 'pagination', {}) };
      let params = { ...state.params, ...ObjectUtils.getIn(parameters, 'params', {}) };

      const dataFetched = await props.onFetchData(Object.assign(params, {
        limit: pagination.itemsPerPage,
        offset: (pagination.pageNumber - 1) * pagination.itemsPerPage,
        pageNumber: pagination.pageNumber
      }));

      const count = ObjectUtils.getIn(dataFetched, 'count', 0);
      const data = ObjectUtils.getIn(dataFetched, 'data', []);
      const error = ObjectUtils.getIn(dataFetched, 'error.message', '');

      return setState({
        isFetchingData: false,
        count,
        data,
        error,
        params,
        pagination,
      });

    } catch (error) {
      return setState({
        ...state,
        count: 0,
        data: [],
        error: error.message,
        isFetchingData: false
      });
    }
  }

  // ======================= Effects =======================
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [props])

  const sortObj = props.structure.filter(v => v.sort).reduce((obj: any, item) => {
    if (item.sort) {
      const key = item.key || item.sort.key || '';
      obj[key] = '';
    }
    return obj
  }, {});

  const RefTable: TableRef = {
    fetchData,
    state,
  }

  useImperativeHandle(ref, () => RefTable)

  return {
    state,
    fetchData,

    isSearchBoxActive,
    setIsSearchBoxActive,

    sortObj,
    messages: props.messages,
  }
}