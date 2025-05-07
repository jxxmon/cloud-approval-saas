from rest_framework import viewsets, permissions, generics
from .models import Approval
from .serializers import ApprovalSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from django.http import FileResponse
from rest_framework.decorators import action

User = get_user_model()

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all().order_by('-created_at')
    serializer_class = ApprovalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(requester=self.request.user)

    @action(detail=True, methods=['get'], url_path='generate-pdf')
    def generate_pdf(self, request, pk=None):
        approval = self.get_object()
        pdf_buffer = generate_approval_pdf(approval)
        return FileResponse(pdf_buffer, as_attachment=True, filename=f'approval_{approval.id}.pdf')

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

def generate_approval_pdf(approval):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    p.setFont("Helvetica", 16)
    p.drawString(100, 800, f"제목: {approval.title}")
    p.setFont("Helvetica", 12)
    p.drawString(100, 770, f"내용: {approval.content}")
    p.drawString(100, 740, f"요청자: {approval.requester.username}")
    p.drawString(100, 710, f"결재자: {approval.approver.username}")
    p.drawString(100, 680, f"상태: {approval.status}")
    p.drawString(100, 650, f"생성일: {approval.created_at.strftime('%Y-%m-%d %H:%M')}")
    p.showPage()
    p.save()
    buffer.seek(0)
    return buffer
