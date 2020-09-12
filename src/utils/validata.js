// 过滤所有特殊字符;
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!#$^&*()=|{ }':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？↵\r\n]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
//邮箱验证
export function validateUserName(value) {
  let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
  if (reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
//密码验证
export function validatePassword(value) {
  let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
//验证码
export function validateVC(value) {
  let reg = /^\d{6}$/;
  if (reg.test(value)) {
    return true;
  } else {
    return false;
  }
}
