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

  // PDF 다운로드 버튼 클릭 시 호출되는 함수
  // 결재의 PDF 파일을 새 창에서 다운로드합니다.
  const handleDownloadPDF = () => {
    window.open(`http://localhost:8000/api/approvals/${approval.id}/generate-pdf/`, '_blank');
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
      {/* PDF 다운로드 버튼: 승인/완료 상태에서만 보이도록 조건문을 둘 수도 있음 */}
      <button onClick={handleDownloadPDF}>PDF 다운로드</button>
    </div>
  );
}

export default ApprovalDetail;
