const required = () => 'Gereklidir';
const minLength = (min: number) => `En az ${min} karakter içermelidir`;
const maxLength = (max: number) => `En fazla ${max} karakter içermelidir`;
const email = () => 'Geçerli bir E-Posta adresi olmalıdır';

export const messages = {
  required,
  minLength,
  maxLength,
  email
};
