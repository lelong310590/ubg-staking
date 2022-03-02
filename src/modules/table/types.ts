import { CSSProperties, FC, RefObject } from "react";

export interface TableFuncFetchDataParameters {
  pagination?: TableStatePagination,
  params?: any,
  isForceUpdate?: boolean
}

export type TableFuncFetchData = (options?: TableFuncFetchDataParameters) => Promise<any>

export interface TableStructureItem {
  name: string,
  key?: string,
  render?: (rowValue: any, fetchData: (params?: TableFuncFetchDataParameters) => Promise<void> | void, column: TableStructureItem) => any,
  style?: CSSProperties,
  className?: string,
  sort?: TableStructureSort,
}

export interface TableStructureSort {
  key?: string,
  increaseValue?: any,
  descreaseValue?: any,
}

export interface ITableFilterStructureItem {
  name: string,
  key: string,
  defaultValue?: any,
  renderValue?: (value: any) => string,
  input: FC<TableFilterInputProps>
}

export interface TableFilterInputProps {
  paramKey: string,
  params: any,
  value: any,
  onChange: (value: any) => void,
}

export interface TableResponse {
  count: number,
  data: any[]
}

export interface TableFilterProps {
  structure: ITableFilterStructureItem[],
  type?: 'popup' | 'panel'
}

export interface TableProps {
  structure: TableStructureItem[],
  onFetchData: (params: TableParams) => Promise<TableResponse>,
  filter?: TableFilterProps,
  className?: string,
  itemPerPages?: number,
  enableReinitialize?: boolean,
  id?: string,
  searchBox?: ITableSearchProps,
  ref?: RefObject<TableRef>,
  messages?: TableMessages<TableParams>,
}

export interface TableMessages<EmptyDataParams> {
  error?: (error: any) => any,
  emptyData?: (params: EmptyDataParams) => any,
}

export interface TableStatePagination {
  pageNumber: number,
  itemsPerPage: number,
}

export interface TableParams {
  limit: number,
  offset: number,
  pageNumber: number,
  [name: string]: any,
}

export interface TableState {
  isFetchingData: boolean,
  count: number,
  data: any[],
  error: string,
  params: any,
  pagination: TableStatePagination,
}

export interface TableSearchOnFetchDataResponse {
  label: string,
  value: any
}

export interface ITableSearchProps {
  onFetchData: (q: string) => Promise<any[]>,
  onSelect: (value: any) => void,
  placeholder?: string,
  messages?: TableMessages<{ q: string }>,
}

export enum ETableSortDefaultValue {
  INCREASE = 'INCREASE',
  DESCREASE = 'DESCREASE',
}

export interface TableRef {
  fetchData: TableFuncFetchData
  state: TableState
}