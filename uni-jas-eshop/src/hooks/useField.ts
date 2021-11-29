import { ChangeEvent, useCallback, useState } from 'react';

const useField = (id: string, required?: boolean) => {
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);

	const error = required && touched && !value;

	return [
		// Current value for convenient access
		value,
		// Clear field
		useCallback(() => {
			setValue('');
			setTouched(false);
		}, []),
		// Props for the TextField
		{
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	] as const;
};

export default useField;