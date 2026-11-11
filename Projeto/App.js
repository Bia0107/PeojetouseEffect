import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

/*Menu do projeto*/
function Menu({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Exercícios com useEffect</Text>
      <View style={styles.botao}>
        <Button title="1 – Boas-vindas" onPress={() => navigation.navigate('BoasVindas')} />
      </View>
      <View style={styles.botao}>
        <Button title="2 – Contador" onPress={() => navigation.navigate('Contador')} />
      </View>
      <View style={styles.botao}>
        <Button title="3 – Alterando o título" onPress={() => navigation.navigate('Titulo')} />
      </View>
    </View>
  );
}

/*Exercício 1*/
function BoasVindas() {
  useEffect(() => {
    Alert.alert('Bem-vindo ao sistema!');
  }, []); // array vazio: executa apenas uma vez, ao montar o componente

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela de boas-vindas</Text>
    </View>
  );
}

/*Exercício 2*/
function Contador() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('O contador foi alterado!');
  }, [contador]); // executa sempre que "contador" mudar

  return (
    <View style={styles.container}>
      <Text style={styles.valor}>{contador}</Text>
      <View style={styles.linha}>
        <Button title="−" onPress={() => setContador(contador - 1)} />
        <View style={{ width: 20 }} />
        <Button title="+" onPress={() => setContador(contador + 1)} />
      </View>
    </View>
  );
}

/*Exercício 3*/
function Titulo({ navigation }) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    navigation.setOptions({
      title: nome.trim() ? `Olá, ${nome.trim()}!` : 'Olá!',
    });
  }, [nome, navigation]); // executa sempre que o nome mudar

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Digite seu nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: João"
        value={nome}
        onChangeText={setNome}
      />
    </View>
  );
}

/* App */
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} options={{ title: 'Início' }} />
        <Stack.Screen name="BoasVindas" component={BoasVindas} options={{ title: 'Boas-vindas' }} />
        <Stack.Screen name="Contador" component={Contador} options={{ title: 'Contador' }} />
        <Stack.Screen name="Titulo" component={Titulo} options={{ title: 'Olá!' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  texto: { fontSize: 18, marginBottom: 12 },
  valor: { fontSize: 56, fontWeight: 'bold', marginBottom: 20 },
  linha: { flexDirection: 'row', alignItems: 'center' },
  botao: { width: '80%', marginVertical: 8 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});
