import { TextField } from '@mui/material';

const InputUncontroled = ({
  value,
  onChange,
  type,
  label,
}: InputUncontroledProps) => {
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

export default InputUncontroled;

interface InputUncontroledProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type: string;
  label: string;
}