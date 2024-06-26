import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaCarga from './screens/pantallacarga';
import Login from './screens/login';
import Inicio from './screens/inicio';
import Capacitaciones from './screens/capacitaciones';
import Servicios from './screens/servicios';
import SolicitudInstalacion from './screens/solicitar-instalacion';
import SolicitudMantenimiento from './screens/solicitar-mantenimiento';
import SolicitudProvision from './screens/solicitar-provision';
import SolicitudServiciotecnico from './screens/solicitar-serviciotecnico';
import CapacitacionDetectores from './screens/capacitacion-detectores';
import CapacitacionExtintores from './screens/capacitacion-extintores';
import CapacitacionMangueras from './screens/capacitacion-mangueras';
import CapacitacionAlarmas from './screens/capacitacion-alarmas';
import AgregarDispositivo from './screens/agregar-dispostivo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }}
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
          name="AgregarDispositivo"
          component={AgregarDispositivo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}