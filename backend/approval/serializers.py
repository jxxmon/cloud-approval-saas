from rest_framework import serializers
from .models import Approval, ApprovalDocument

class ApprovalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalDocument
        fields = ['id', 'file', 'uploaded_at']

class ApprovalSerializer(serializers.ModelSerializer):
    documents = ApprovalDocumentSerializer(many=True, read_only=True)
    class Meta:
        model = Approval
        fields = ['id', 'title', 'content', 'requester', 'approver', 'status', 'created_at', 'updated_at', 'documents']
