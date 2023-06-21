export interface CommonTableColumn<T> {
  title: string;
  id: string;
  sorting?: boolean;
  resolve?: (row: T) => number | string | Date;
  templateBy?: string;
}
export interface CommonTableOptions {
  selection?: boolean;
  filter?: boolean;
  pagination: boolean;
  tableTitle: string;
  showIndex?: boolean;
  filterComponent?: () => JSX.Element;

  /**
   * @description a function to run when add button is clicked on common table component
   */
  addNewHandler?: () => void;
}

export interface CommonTableConfig {
  options: CommonTableOptions;
  columns: CommonTableColumn<any>[];
}
