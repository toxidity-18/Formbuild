import {
  BoxSelect,
  Calendar,
  CaseSensitive,
  ChevronDown,
  CircleCheck,
  Link,
  List,
  Lock,
  Mail,
  MoveVertical,
  Plus,
  SlidersHorizontal,
  ToggleLeft,
} from "lucide-react";
import InputComp from "../_components/elements/input_comp/input_comp";
import Textbox from "../_components/elements/textbox/textbox";
import Datepicker from "../_components/elements/date_picker/date_picker";
import Range from "../_components/elements/range/range";
import DropdownComp from "../_components/elements/dropdown/dropdown";
import Multiplechoice from "../_components/elements/multiple_choice/multiple_choice";
import CheckboxComp from "../_components/elements/checkbox/checkbox";
import Linebreak from "../_components/elements/linebreak/linebreak";
import SwitchComp from "../_components/elements/switch/switch";

type TElement = {
  label: string;
  icon: React.ReactNode;
  type: string;
  completed: boolean;
};

export const elements: TElement[] = [
  {
    label: "Text Input",
    icon: <CaseSensitive size={16} />,
    type: "text_input",
    completed: true,
  },
  {
    label: "Email Input",
    icon: <Mail size={16} />,
    type: "email_input",
    completed: true,
  },
  {
    label: "Number Input",
    icon: <Plus size={16} />,
    type: "number_input",
    completed: true,
  },
  {
    label: "Url Input",
    icon: <Link size={16} />,
    type: "url_input",
    completed: true,
  },
  {
    label: "Password",
    icon: <Lock size={16} />,
    type: "password_input",
    completed: true,
  },
  {
    label: "Textbox",
    icon: <BoxSelect size={16} />,
    type: "text_box",
    completed: true,
  },
  {
    label: "Date picker",
    icon: <Calendar size={16} />,
    type: "date_picker",
    completed: false,
  },
  {
    label: "Range",
    icon: <SlidersHorizontal size={16} />,
    type: "range",
    completed: false,
  },
  {
    label: "Dropdown",
    icon: <ChevronDown size={16} />,
    type: "dropdown",
    completed: false,
  },
  {
    label: "Muiltiple Choice",
    icon: <List size={16} />,
    type: "multichoice",
    completed: false,
  },
  {
    label: "Checkbox",
    icon: <CircleCheck size={16} />,
    type: "checkbox",
    completed: true,
  },
  {
    label: "Linebreak",
    icon: <MoveVertical size={16} />,
    type: "linebreak",
    completed: false,
  },
  {
    label: "Switch",
    icon: <ToggleLeft size={16} />,
    type: "switch",
    completed: false,
  },
];

export const ElementsObj: Record<string, React.ComponentType<any>> = {
  text_input: InputComp,
  email_input: InputComp,
  number_input: InputComp,
  url_input: InputComp,
  password_input: InputComp,
  text_box: Textbox,
  date_picker: Datepicker,
  range: Range,
  dropdown: DropdownComp,
  multichoice: Multiplechoice,
  checkbox: CheckboxComp,
  linebreak: Linebreak,
  switch: SwitchComp,
};
