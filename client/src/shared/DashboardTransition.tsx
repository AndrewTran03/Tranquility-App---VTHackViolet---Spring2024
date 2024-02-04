import { Ref, forwardRef } from "react";
import { Slide } from "@mui/material";
import { TransitionPropsType } from "./types";

const DashboardTransition = forwardRef((props: TransitionPropsType, ref: Ref<unknown>) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DashboardTransition;
