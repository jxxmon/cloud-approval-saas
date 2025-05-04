from rest_framework import viewsets, permissions
from .models import Approval
from .serializers import ApprovalSerializer

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all().order_by('-created_at')
    serializer_class = ApprovalSerializer
    permission_classes = [permissions.IsAuthenticated]
