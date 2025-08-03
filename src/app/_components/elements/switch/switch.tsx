"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";

const SwitchComp = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      isSheetOpen={isSheetOpen}

      setSheetOpen={setSheetOpen}
    >
      <div>SwitchComp</div>
    </EditComp>
  );
};

export default SwitchComp;
