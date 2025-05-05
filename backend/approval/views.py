from rest_framework import viewsets, permissions, generics
from .models import Approval
from .serializers import ApprovalSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all().order_by('-created_at')
    serializer_class = ApprovalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

class CurrentUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

class UserListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        users = User.objects.all()
        return Response([
            {'id': u.id, 'username': u.username, 'email': u.email}
            for u in users
        ])
