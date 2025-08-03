import { TProperty } from "@/app/types";

type TCompProps = {
  item: TProperty;
  deleteField: (value: string) => void;
  updateProperty: (value: TProperty) => void;
  isPreview?: boolean;
};

export type { TCompProps };
