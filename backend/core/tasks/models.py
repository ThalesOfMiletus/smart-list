from django.utils import timezone
from django.db import models


class Task(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField(blank=True, null=True)
    relato = models.TextField(blank=True)  # Novo campo de relato
    criada_em = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(blank=True, null=True)
    concluida = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.concluida and not self.data_conclusao:
            self.data_conclusao = timezone.now()
        super().save(*args, **kwargs)
        
    def concluir(self):
        self.concluida = True
        self.data_conclusao = timezone
        self.save()

    class Meta:
        ordering = ['-criada_em']
        
    def __str__(self):
        return self.titulo


