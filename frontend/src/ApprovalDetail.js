import React, { useEffect, useState } from 'react';
import { getApproval, updateApproval } from './api';

function ApprovalDetail({ id, onBack }) {
  const [approval, setApproval] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApproval(id)
      .then(res => setApproval(res.data))
      .catch(err => setError('상세 불러오기 실패'));
  }, [id]);

  const handleApprove = () => {
    updateApproval(id, { ...approval, status: 'approved' })
      .then(res => setApproval(res.data))
      .catch(err => setError('승인 실패'));
  };

  const handleComplete = () => {
    updateApproval(id, { ...approval, status: 'completed' })
      .then(res => setApproval(res.data))
      .catch(err => setError('완료 처리 실패'));
  };

  if (error) return <div>{error}</div>;
  if (!approval) return <div>로딩 중...</div>;

  return (
    <div>
      <button onClick={onBack}>목록으로</button>
      <h2>{approval.title}</h2>
      <p>{approval.content}</p>
      <p>상태: {approval.status}</p>
      <button onClick={handleApprove}>승인</button>
      <button onClick={handleComplete}>완료</button>
    </div>
  );
}

export default ApprovalDetail;
