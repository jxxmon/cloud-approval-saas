import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

export const getApprovals = () => axios.get(`${API_BASE}/approvals/`, { withCredentials: true });
export const createApproval = (data) => axios.post(
  `${API_BASE}/approvals/`,
  data,
  {
    headers: { 'X-CSRFToken': csrftoken },
    withCredentials: true
  }
);
export const getApproval = (id) => axios.get(`${API_BASE}/approvals/${id}/`, { withCredentials: true });
export const updateApproval = (id, data) => axios.put(
  `${API_BASE}/approvals/${id}/`,
  data,
  {
    headers: { 'X-CSRFToken': csrftoken },
    withCredentials: true
  }
);
export const deleteApproval = (id) => axios.delete(
  `${API_BASE}/approvals/${id}/`,
  {
    headers: { 'X-CSRFToken': csrftoken },
    withCredentials: true
  }
);
