import React, { useState, useEffect } from 'react';
import { createApproval } from './api';
import axios from 'axios';

function ApprovalCreate({ onCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [approver, setApprover] = useState('');
  const [requester, setRequester] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/', { withCredentials: true })
      .then(res => setRequester(res.data.id))
      .catch(() => setRequester(''));
    axios.get('http://localhost:8000/api/users/', { withCredentials: true })
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createApproval({ title, content, approver })
      .then(() => {
        setTitle('');
        setContent('');
        setApprover('');
        onCreated();
      })
      .catch(() => setError('생성 실패'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>전자결재 생성</h2>
      <div>
        <label>결재요청자(자동): </label>
        <input value={requester} readOnly />
      </div>
      <div>
        <label>결재자(상급자): </label>
        <select value={approver} onChange={e => setApprover(e.target.value)} required>
          <option value="">선택하세요</option>
          {users.filter(u => u.id !== requester).map(u => (
            <option key={u.id} value={u.id}>{u.username} (ID: {u.id})</option>
          ))}
        </select>
      </div>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" required />
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="내용" required />
      <button type="submit">생성</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default ApprovalCreate;
