import React, { useState } from 'react';
import './SignupPage.style.css';
import authApi from '../../../../../utils/authApi'; // ✅ 수정된 포인트

const SignupPage = ({ setIsSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('❌ 비밀번호가 일치하지 않습니다');
      return;
    }

    try {
      await authApi.post('/api/users/signup', {
        username: formData.username,
        password: formData.password,
        name: formData.name,
        birthYear: parseInt(formData.birthYear),
        birthMonth: parseInt(formData.birthMonth),
        birthDay: parseInt(formData.birthDay),
        gender: formData.gender === 'male' ? '남' : '여',
      });

      alert('✅ 회원가입 성공! 이제 로그인하세요.');
      setIsSignup(false);
    } catch (err) {
      if (err.response?.status === 400) {
        alert('⚠️ 이미 존재하는 아이디입니다.');
      } else {
        alert('🚨 회원가입 중 오류가 발생했습니다.');
        console.error(err);
      }
    }
  };

  return (
    <div className="signup-modal">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="username" placeholder="아이디" value={formData.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
        <input name="name" placeholder="이름" value={formData.name} onChange={handleChange} required />
        <input name="birthYear" placeholder="년(4자)" value={formData.birthYear} onChange={handleChange} required />

        <div className="birth-gender-row">
          <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} required>
            <option value="">월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select name="birthDay" value={formData.birthDay} onChange={handleChange} required>
            <option value="">일</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">성별</option>
            <option value="male">남자</option>
            <option value="female">여자</option>
          </select>
        </div>

        <button type="submit" className="login-button">가입하기</button>
        <button type="button" className="signup-link" onClick={() => setIsSignup(false)}>로그인으로 돌아가기</button>
      </form>
    </div>
  );
};

export default SignupPage;
