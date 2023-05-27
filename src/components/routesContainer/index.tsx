import { Suspense } from "react";
import PageLoader from "./pageLoader";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const LazyLoader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default LazyLoader;
