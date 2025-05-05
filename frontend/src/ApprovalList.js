import React, { useEffect, useState } from 'react';
import { getApprovals } from './api';

function ApprovalList({ onSelect }) {
  const [approvals, setApprovals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApprovals()
      .then(res => setApprovals(res.data))
      .catch(err => setError('불러오기 실패'));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>전자결재 목록</h2>
      <ul>
        {approvals.map(a => (
          <li key={a.id} onClick={() => onSelect(a.id)} style={{cursor:'pointer'}}>
            {a.title} - {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApprovalList;
