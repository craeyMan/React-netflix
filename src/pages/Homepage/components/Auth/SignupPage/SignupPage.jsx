import React, { useState } from 'react';
import './SignupPage.style.css';

const SignupPage = ({ setIsSignup }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    gender: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
    alert('회원가입 성공!');
    setIsSignup(false);
  };

  return (
    <div className="signup-modal">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="id" placeholder="아이디" value={formData.id} onChange={handleChange} required />
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

        <input name="email" placeholder="본인 확인 이메일 (선택)" value={formData.email} onChange={handleChange} />

        <button type="submit" className="login-button">가입하기</button>
        <button type="button" className="signup-link" onClick={() => setIsSignup(false)}>로그인으로 돌아가기</button>
      </form>
    </div>
  );
};

export default SignupPage;
