import React, { Fragment, useEffect } from "react";
import { useAppDispatch } from "store";
import {
  getCategories,
  selectCategories,
  setCategoriesPaginatedQuery,
} from "./categories.slice";
import { useSelector } from "react-redux";
import CommonTable from "components/common-table";
import { CategoriesSource } from "./categories.model";
import { Category } from "./categories.interface";
import { convertDate, convertStatus } from "utils/helper";
import { PaginatedQuery } from "interfaces/api.interface";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, total, pageOptions, status } =
    useSelector(selectCategories);
  const categoriesSource = new CategoriesSource();

  useEffect(() => {
    dispatch(
      getCategories({
        pageSize: pageOptions.pageSize,
        pageIndex: pageOptions.pageIndex,
        sort_by: pageOptions.sort_by,
        sort_order: pageOptions.sort_order,
      })
    );
    return () => {};
  }, [dispatch, pageOptions]);

  const handlePageOptionsChanged = (data: PaginatedQuery) => {
    dispatch(setCategoriesPaginatedQuery(data));
  };

  const renderView = () => {
    return (
      <Fragment>
        <CommonTable
          config={categoriesSource}
          rows={categories}
          total={total}
          pageOptions={pageOptions}
          status={status}
          handlePageOptionsChanged={handlePageOptionsChanged}
        >
          {{
            createdAt: (item: Category) => <>{convertDate(item.createdAt)}</>,
            status: (item: Category) => (
              <span style={{ color: item.status === 1 ? "green" : "red" }}>
                {convertStatus(item.status)}
              </span>
            ),
          }}
        </CommonTable>
      </Fragment>
    );
  };
  return <Fragment>{renderView()}</Fragment>;
};

export default Categories;
