import {
  CommonTableColumn,
  CommonTableConfig,
  CommonTableOptions,
} from "components/common-table/common-table.interface";
import { Category } from "./categories.interface";

export class CategoriesSource implements CommonTableConfig {
  columns: CommonTableColumn<Category>[] = [
    {
      id: "categoryName",
      title: "Category Name",
      sorting: true,
      resolve: (category: Category) => category.categoryName || "-",
    },

    {
      id: "status",
      title: "Status",
      templateBy: "status",
    },
    {
      id: "createdAt",
      title: "Created At",
      templateBy: "createdAt",
    },
  ];
  options: CommonTableOptions = {
    pagination: true,
    tableTitle: "Categories",
    filter: true,
    showIndex: true,
    selection: false,
  };
}
