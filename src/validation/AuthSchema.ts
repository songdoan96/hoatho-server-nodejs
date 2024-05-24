// export interface RegisterFormType {
//   staff_id?: string;
//   password?: string;
//   name?: string;
//   phone?: string;
//   birthday?: Date;
// }
// export default function RegisterValidateForm(formData: RegisterFormType) {
//   let errors: RegisterFormType = {};

//   if (!formData.staff_id) {
//     errors.staff_id = 'Mã số nhân viên không được để trống';
//   } else {
//     if (!/^tp\d+$/gi.test(formData.staff_id)) {
//       errors.staff_id = 'Mã số nhân viên không đúng định dạng';
//     }
//   }
//   if (!formData.name) {
//     errors.name = 'Họ tên không được để trống';
//   } else {
//     const nameRegex =
//       /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/gm;
//     if (!nameRegex.test(formData.name)) {
//       errors.name = 'Vui lòng nhập đúng họ tên';
//     }
//   }
//   if (!formData.phone) {
//     errors.phone = 'SĐT không được để trống';
//   } else {
//     if (!/(0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone)) {
//       errors.phone = 'SĐT không hợp lệ';
//     }
//   }
//   if (!formData.password) {
//     errors.password = 'Mật khẩu không được để trống';
//   } else {
//     if (formData.password.length < 3) {
//       errors.password = 'Mật khẩu ít nhất 3 ký tự';
//     }
//   }

//   if (Object.keys(errors).length === 0) {
//     return null;
//   }
//   return errors;
// }
import {z} from 'zod';
const RegisterSchema = z.object({
  staff_id: z
    .string()
    .min(1, {message: 'Mã số nhân viên không được để trống'})
    .regex(/^tp\d+$/gi, {message: 'Mã số nhân viên không đúng định dạng'}),
  name: z
    .string()
    .min(1, {message: 'Họ tên không được để trống'})
    .regex(
      /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/gm,
      {message: 'Vui lòng nhập đúng họ tên'},
    ),
  phone: z
    .string()
    .min(1, {message: 'SĐT không được để trống'})
    .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: 'SĐT không hợp lệ',
    }),
  password: z.string().min(3, {message: 'Mật khẩu ít nhất 3 ký tự'}),
});
const LoginSchema = z.object({
  staff_id: z
    .string()
    .min(1, {message: 'Mã số nhân viên không được để trống'})
    .regex(/^tp\d+$/gi, {message: 'Mã số nhân viên không đúng định dạng'}),
  password: z.string().min(1, {message: 'Mật khẩu không được để trống'}),
});
export {LoginSchema, RegisterSchema};
