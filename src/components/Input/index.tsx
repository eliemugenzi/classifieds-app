/*
 * Component: TextInput
 * Created At: 2020-10-07 09:52:16
 */

import Base from './Base';
import PhoneNumber from './PhoneNumber';
import Password from './Password';
import Number from './Number';
import Amount from './Amount';
import TextArea from './TextArea';
import Search from './Search';
import Date from './Date';
import Select from './Select';
import Time from './Time';
import Email from './Email';

type TextInputProps = typeof Base & {
  PhoneNumber: typeof PhoneNumber;
  Password: typeof Password;
  Number: typeof Number;
  Amount: typeof Amount;
  TextArea: typeof TextArea;
  Search: typeof Search;
  Date: typeof Date;
  Select: typeof Select;
  Time: typeof Time;
  Email: typeof Email;
};

const TextInput = Base as TextInputProps;

TextInput.PhoneNumber = PhoneNumber;
TextInput.Password = Password;
TextInput.Number = Number;
TextInput.Amount = Amount;
TextInput.TextArea = TextArea;
TextInput.Search = Search;
TextInput.Date = Date;
TextInput.Select = Select;
TextInput.Time = Time;
TextInput.Email = Email;

export default TextInput;
