import React, { useState } from 'react';
import ApprovalList from './ApprovalList';
import ApprovalDetail from './ApprovalDetail';
import ApprovalCreate from './ApprovalCreate';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Cloud Approval SaaS</h1>
      {selectedId ? (
        <ApprovalDetail id={selectedId} onBack={() => setSelectedId(null)} />
      ) : (
        <>
          <ApprovalCreate onCreated={() => setRefresh(r => !r)} />
          <ApprovalList onSelect={setSelectedId} key={refresh} />
        </>
      )}
    </div>
  );
}

export default App;
