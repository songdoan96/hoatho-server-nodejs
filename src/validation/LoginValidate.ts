export interface LoginFormType {
  staff_id?: string;
  password?: string;
}
export default function LoginValidateForm(formData: LoginFormType) {
  let errors: LoginFormType = {};

  if (!formData.staff_id) {
    errors.staff_id = 'Mã số nhân viên không được để trống';
  } else {
    if (!/^tp\d+$/gi.test(formData.staff_id)) {
      errors.staff_id = 'Mã số nhân viên không đúng định dạng';
    }
  }

  if (!formData.password) {
    errors.password = 'Mật khẩu không được để trống';
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }
  return errors;
}
