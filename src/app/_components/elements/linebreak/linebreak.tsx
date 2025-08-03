"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";

const Linebreak = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      isSheetOpen={isSheetOpen}
      setSheetOpen={setSheetOpen}
    >
      <div>Linebreak</div>
    </EditComp>
  );
};

export default Linebreak;
