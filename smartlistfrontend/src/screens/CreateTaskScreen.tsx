import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { criarTarefaPorRelato } from '../services/taskService';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateTaskScreen: React.FC = () => {
  const [relato, setRelato] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const handleCriarTarefa = async () => {
    if (!relato.trim()) {
      Alert.alert('Erro', 'Por favor, insira um relato.');
      return;
    }

    try {
      const novaTarefa = await criarTarefaPorRelato(relato);
      Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
        { text: 'OK', onPress: () => setRelato('') },
      ]);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar tarefa.');
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await audioRecorderPlayer.startRecorder();
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Gravando áudio:', e.currentPosition);
        return;
      });
    } catch (error) {
      console.error('Erro ao iniciar gravação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a gravação.');
    }
  };

  const stopRecording = async () => {
    try {
      const audioPath = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);

      console.log('Áudio gravado em:', audioPath);

      // Aqui você pode implementar uma lógica para transcrever o áudio em texto
      // ou processá-lo de outra forma e adicionar ao campo relato
      setRelato((prevRelato) => prevRelato + ' [Áudio gravado]');
    } catch (error) {
      console.error('Erro ao parar gravação:', error);
      Alert.alert('Erro', 'Não foi possível parar a gravação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Tarefa por Relato</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite ou grave o relato da tarefa"
        value={relato}
        onChangeText={setRelato}
        multiline
      />
      <View style={styles.audioContainer}>
        <TouchableOpacity // Botão de gravação
          // onPress={isRecording ? stopRecording : startRecording}
          style={styles.attachButton}
        >
          <Icon
            name={isRecording ? 'mic-off' : 'mic'}
            size={24}
            color="#fff"
          />
          <Text style={styles.attachButtonText}>
            {isRecording ? 'Parar' : 'Gravar'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity // Botão de anexar arquivo
        style={styles.attachButton}>
          <Icon name="attach-file" size={24} color="#fff" />
        <Text style={styles.attachButtonText}>Anexar Arquivo</Text>
        </TouchableOpacity>
      </View>
      <Button title="Criar Tarefa" onPress={handleCriarTarefa} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  audioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 10,
  },
  attachButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CreateTaskScreen;
