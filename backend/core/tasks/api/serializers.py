from rest_framework import serializers
from ..models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'titulo', 'descricao', 'criada_em', 'data_conclusao', 'relato', 'concluida']