import bcrypt from 'bcrypt';

const plainPassword = 'Giang123@';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Lỗi khi hash mật khẩu:', err);
    return;
  }
  console.log('Mật khẩu đã được hash:', hash);
});