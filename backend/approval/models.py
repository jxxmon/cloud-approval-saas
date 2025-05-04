from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Approval(models.Model):
    STATUS_CHOICES = [
        ('requested', '결재 요청'),
        ('approved', '승인'),
        ('rejected', '반려'),
        ('completed', '완료'),
    ]
    title = models.CharField(max_length=200)
    content = models.TextField()
    requester = models.ForeignKey(User, related_name='requested_approvals', on_delete=models.CASCADE)
    approver = models.ForeignKey(User, related_name='approvals_to_approve', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ApprovalDocument(models.Model):
    approval = models.ForeignKey(Approval, related_name='documents', on_delete=models.CASCADE)
    file = models.FileField(upload_to='approval_docs/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
