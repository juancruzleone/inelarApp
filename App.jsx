import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
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

// Mantén la pantalla de carga visible mientras se inicializa la app
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Realiza cualquier tarea de inicialización aquí
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simula una carga de 2 segundos
      } catch (e) {
        console.warn(e);
      } finally {
        // Oculta la pantalla de carga de Expo
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
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
            gestureEnabled: false, // Deshabilita el gesto de deslizar hacia atrás
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
  );
}

