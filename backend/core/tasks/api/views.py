from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.timezone import now
from ..models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import api_view
import google.generativeai as genai
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet para manipulação de tarefas.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    genai.configure(api_key="GEMENIAPIKEY")

    @action(detail=False, methods=['get'], url_path='get-tasks', url_name='get_tasks')
    def get_tasks(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='create-from-relato', url_name='create_from_relato')
    def criar_tarefa_por_relato(self, request):
        
        relato = request.data.get('relato')
        if not relato:
            return Response({"error": "Relato não fornecido."}, status=status.HTTP_400_BAD_REQUEST)

        # Prompt para a IA
        prompt = (
            f"Você é um assistente virtual especializado em criar tarefas. "
            f"Com base no relato a seguir, crie um título para a tarefa e uma descrição curta sobre ele: '{relato}'"
        )

        try:
            # Enviando o prompt para a IA e processando a resposta
            print(f"Enviando prompt para a IA: {prompt}")  # Log para depuração
            response = genai.GenerativeModel('gemini-pro').generate_content(prompt)

            # Verificação de erro na resposta da IA
            if not response:
                return Response({"error": "Erro na resposta da IA. Nenhuma resposta recebida."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            resposta_gerada = response.text
            print(f"Resposta da IA: {resposta_gerada}")  # Log para depuração

            # Processamento da resposta para extrair título e descrição
            titulo = None
            descricao = None
            linhas = resposta_gerada.split("\n")

            for linha in linhas:
                if "**Título da Tarefa:**" in linha or "**Título:**" in linha:
                    titulo = linha.replace("**Título da Tarefa:**", "").replace("**Título:**", "").strip()
                elif "**Descrição da Tarefa:**" in linha or "**Descrição:**" in linha:
                    descricao_index = linhas.index(linha) + 1  # A descrição começa logo após essa linha
                    descricao = "\n".join(linhas[descricao_index:]).strip()
                    break  # Para ao encontrar a descrição

            # Verificando se o título e a descrição foram extraídos corretamente
            print(f"Título extraído: {titulo}, Descrição extraída: {descricao}")  # Log para depuração

            # Garantindo que o título e a descrição não sejam vazios
            if titulo and (descricao or descricao is not None):
                task = Task.objects.create(
                    titulo=titulo,
                    descricao=descricao
                )
                return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "A IA não conseguiu gerar título e/ou descrição válidos."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(f"Erro durante o processamento: {str(e)}")  # Log para depuração
            return Response({"error": f"Erro no servidor: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=username,
            password=make_password(password)
        )

        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)