import { TextField } from '@mui/material';

const InputField = ({
  value,
  onChange,
  type,
  label,
}: InputFieldProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      label={label}
      size='small'
      variant='outlined' />
  );
}

export default InputField;

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: string;
  label: string;
}