from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Configuração do roteador para o ViewSet
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

# URLs
urlpatterns = [
    path('', include(router.urls)),  # Endpoints padrão do ViewSet
        # Rota de Login (Token)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Rota de Cadastro
    path('api/register/', RegisterView.as_view(), name='register'),
]
