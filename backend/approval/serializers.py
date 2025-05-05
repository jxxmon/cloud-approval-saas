from rest_framework import serializers
from .models import Approval, ApprovalDocument
from django.contrib.auth import get_user_model

User = get_user_model()

class ApprovalDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApprovalDocument
        fields = ['id', 'file', 'uploaded_at']

class ApprovalSerializer(serializers.ModelSerializer):
    documents = ApprovalDocumentSerializer(many=True, read_only=True)
    requester = serializers.PrimaryKeyRelatedField(read_only=True)
    approver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Approval
        fields = ['id', 'title', 'content', 'requester', 'approver', 'status', 'created_at', 'updated_at', 'documents']
