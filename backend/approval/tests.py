from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from .models import Approval

User = get_user_model()

class PDFGenerationTestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='pass')
        self.user2 = User.objects.create_user(username='user2', password='pass')
        self.approval = Approval.objects.create(
            title='테스트 결재',
            content='테스트 내용',
            requester=self.user1,
            approver=self.user2,
            status='completed',
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user1)

    def test_generate_pdf(self):
        url = f'/api/approvals/{self.approval.id}/generate-pdf/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        first_bytes = b''
        for chunk in response.streaming_content:
            first_bytes += chunk
            if len(first_bytes) >= 4:
                break
        self.assertTrue(first_bytes.startswith(b'%PDF'))
