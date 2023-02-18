import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { CheckBox, Icon, Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import { ThemeProvider } from 'react-native-elements';

const darkTheme = {
  colors: {
    primary: '#FFFFFF',
    secondary: '#222222',
    text: '#FFFFFF',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButtonText: {
  	justifyContent: 'center',
  	alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    margin: 20,
  },
  completed: {
    textDecorationLine: 'line-through',
    margin: 20,
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    setTasks([...tasks, { name: newTask, checked: false }]);
    setNewTask('');
    setIsModalVisible(false);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].checked = !newTasks[index].checked;
    setTasks(newTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <CheckBox checked={item.checked} onPress={() => toggleTask(index)} />
      <Text style={[styles.text, item.checked && styles.completed]}>
        {item.name}
      </Text>
      <TouchableOpacity onPress={() => removeTask(index)}>
        <Icon name="delete" type="material" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  return (

    <ThemeProvider theme={darkTheme}>
      <View style={styles.container}>
        	<StatusBar/>      
        	<Text style={styles.title}>Lista de tarefas</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Icon name="add" type="material" color="#FFFFFF" />
          <Text style={styles.addButtonText}>Adicionar tarefa</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
        >
          <View style={{ backgroundColor: '#FFFFFF', padding: 20, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Nova tarefa</Text>
            <Input
              placeholder="Digite a tarefa"
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
                      <TouchableOpacity
              onPress={addTask}
              style={{
                backgroundColor: '#222222',
                marginTop: 20,
                padding: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ThemeProvider>
  );
}
