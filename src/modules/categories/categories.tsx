import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { getCategories, selectCategoriesStatus } from "./categories.slice";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import Loader from "components/loader";

const Categories = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const status = useSelector(selectCategoriesStatus);
  useEffect(() => {
    dispatch(getCategories());
    return () => {};
  }, [dispatch, searchText]);

  const search = () => {
    setSearchText("abc");
  };

  const renderLoading = () => {
    return (
      <Fragment>
        <Loader />
        <Skeleton
          height={100}
          width={"100%"}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "8px", marginTop: "16px" }}
        />
        <Skeleton
          height={500}
          width={"100%"}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: "8px", marginTop: "16px" }}
        />
      </Fragment>
    );
  };

  const renderView = () => {
    if (status === "loading") {
      return renderLoading();
    }
    return (
      <Fragment>
        <h1>Table loaded</h1>
      </Fragment>
    );
  };
  return <Fragment>{renderView()}</Fragment>;
};

export default Categories;
