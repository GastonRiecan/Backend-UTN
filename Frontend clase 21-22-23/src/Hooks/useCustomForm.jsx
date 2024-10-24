import { useState } from "react";

const useCustomForm = (form_fields) => {
    const [form_vaules_state, setFormValuesState] = useState(form_fields);

    const handleChangeInputValue = (event) => {
        const input_name = event.target.name;
        const input_value = event.target.value;
        setFormValuesState(
            (prev_form_vaules_state) => {
                //Lo que retorne sta callback se guarda como  nuevo valor del estado
                return {
                    ...prev_form_vaules_state,
                    [input_name]: input_value
                }
            }
        ) 
    }

    return {
        form_vaules_state,
        handleChangeInputValue
    }
};

export default useCustomForm;
