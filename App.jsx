import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import PantallaCarga from './screens/pantallacarga';
import Login from './screens/login';
import Register from './screens/register';
import Inicio from './screens/inicio';
import Capacitaciones from './screens/capacitaciones';
import Servicios from './screens/servicios';
import SolicitudInstalacion from './screens/SolicitarInstalacion';
import SolicitudMantenimiento from './screens/SolicitarMantenimiento';
import SolicitudProvision from './screens/SolicitarProvision';
import SolicitudServiciotecnico from './screens/SolicitarServicioTecnico';
import Instalaciones from './screens/Instalaciones';
import InstalacionDetalle from './screens/InstalacionDetalle'; 
import CapacitacionDetectores from './screens/CapacitacionDetectores';
import CapacitacionExtintores from './screens/CapacitacionExtintores';
import CapacitacionMangueras from './screens/CapacitacionMangueras';
import CapacitacionAlarmas from './screens/CapacitacionAlarmas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen
            name="AuthLoading"
            component={AuthLoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PantallaCarga"
            component={PantallaCarga}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Inicio"
            component={Inicio}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Capacitaciones"
            component={Capacitaciones}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Servicios"
            component={Servicios}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SolicitudInstalacion"
            component={SolicitudInstalacion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SolicitudMantenimiento"
            component={SolicitudMantenimiento}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SolicitudProvision"
            component={SolicitudProvision}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SolicitudServiciotecnico"
            component={SolicitudServiciotecnico}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CapacitacionDetectores"
            component={CapacitacionDetectores}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CapacitacionExtintores"
            component={CapacitacionExtintores}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CapacitacionMangueras"
            component={CapacitacionMangueras}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CapacitacionAlarmas"
            component={CapacitacionAlarmas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Instalaciones"
            component={Instalaciones}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InstalacionDetalle"
            component={InstalacionDetalle}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}