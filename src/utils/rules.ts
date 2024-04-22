export class RulesLogin {
  static staff_id = () => {
    return {
      required: {
        value: true,
        message: 'Mã số nhân viên không được để trống',
      },
      minLength: {
        value: 5,
        message: 'Mã số nhân viên phải có ít nhất 5 ký tự',
      },
      pattern: {
        value: /^tp\d+$/gi,
        message: 'Mã số nhân viên không đúng định dạng',
      },
    };
  };
  static password = () => {
    return {
      required: {
        value: true,
        message: 'Mật khẩu không được để trống',
      },
      minLength: {
        value: 3,
        message: 'Mật khẩu phải có ít nhất 3 ký tự',
      },
    };
  };
}
export class RulesRegister {
  static staff_id = () => {
    return {
      required: {
        value: true,
        message: 'Mã số nhân viên không được để trống',
      },
      minLength: {
        value: 5,
        message: 'Mã số nhân viên phải có ít nhất 5 ký tự',
      },
      pattern: {
        value: /^tp\d+$/gi,
        message: 'Mã số nhân viên không đúng định dạng',
      },
    };
  };
  static name = () => {
    return {
      required: {
        value: true,
        message: 'Họ tên không được để trống',
      },
      minLength: {
        value: 5,
        message: 'Họ tên phải có ít nhất 5 ký tự',
      },
    };
  };
  static phone = () => {
    return {
      required: {
        value: true,
        message: 'SĐT không được để trống',
      },
      pattern: {
        value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
        message: 'SĐT không hợp lệ',
      },
    };
  };
  static password = () => {
    return {
      required: {
        value: true,
        message: 'Mật khẩu không được để trống',
      },
      minLength: {
        value: 3,
        message: 'Mật khẩu phải có ít nhất 3 ký tự',
      },
    };
  };
  static birthday = () => {
    return {
      required: {
        value: true,
        message: 'Mật khẩu không được để trống',
      },
    };
  };
}
