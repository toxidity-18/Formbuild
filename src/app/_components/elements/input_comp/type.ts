import { TValidation } from "@/app/types";

type TFieldFunctions = {
    setHideLabel: () => void;
    setHidePlaceholder: () => void | null;
    setHideDescription: () => void;
    setLabel: (value: string) => void;
    setDefaultValue: (value: string | number | undefined) => void | null;
    setDescription: (value: string) => void;
    setPlaceholder: (value: string) => void | null;
    setIsRequired: () => void;
    setIsDisabled: () => void;
    setValidations: (obj: TValidation) => void | null
}

export type { TFieldFunctions }