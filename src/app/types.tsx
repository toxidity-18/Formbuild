import { DraggableChildrenFn, DraggableId } from "@hello-pangea/dnd";

type TDraggableProps = {
  // required
  draggableId: DraggableId;
  index: number;
  children: DraggableChildrenFn;
  // optional
  isDragDisabled?: boolean;
  disableInteractiveElementBlocking?: boolean;
  shouldRespectForcePress?: boolean;
};

type TValidation = {
  name: string;
  errorMessage: string;
  metric: string | number;
};

type TUiProp = {
  fontsize?: number;
  color?: string;
};
type TUi = {
  [key: string]: TUiProp;
};

type TUiSchema = TUi[];

type TProperty = {
  id: string;
  type: string;
  label: string;
  description: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  isLabelHidden: boolean;
  isDescriptionHidden: boolean;
  isPlaceholderHidden?: boolean;
  disabled: boolean;
  className?: string;
  validations?: TValidation[];
  uiSchema?: TUiSchema;
};

type TFormData = {
  title: string;
  description: string;
  hideDescription: boolean;
  hideTitle: boolean;
  required: string[];
  properties: TProperty[];
};

export type { TFormData, TProperty, TValidation };
