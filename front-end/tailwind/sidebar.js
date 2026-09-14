import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', route: 'Home' },
  { id: 'estoque', label: 'Estoque', route: 'Estoque' },
  { id: 'movimentacao', label: 'Movimentação', route: 'Movimentacao' },
  { id: 'entrada', label: 'Entrada', route: 'Entrada' },
  { id: 'saida', label: 'Saída', route: 'Saida' },
  { id: 'alertas', label: 'Alertas', route: 'Alertas' },
  { id: 'relatorios', label: 'Relatórios', route: 'Relatorios' },
  { id: 'historico', label: 'Histórico', route: 'Historico' },
  { id: 'funcionarios', label: 'Funcionários', route: 'Funcionarios' },
  { id: 'admin', label: 'Admin', route: 'Admin' },
];

export default function Sidebar({ activePage, navigation }) {
  return (
    <View style={styles.sidebar}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Marca */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>DoceGestão</Text>
          <Text style={styles.brandSub}>Confeitaria • Gestão Premium</Text>
        </View>

        {/* Lista de Rotas */}
        <View style={styles.navGroup}>
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.navItem, isActive && styles.navItemActive]}
                onPress={() => navigation.navigate(item.route)}
              >
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Botão Ação */}
      <TouchableOpacity style={styles.btnAction}>
        <Text style={styles.btnActionText}>+ Novo Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: { width: 240, backgroundColor: '#FFF', borderRightWidth: 1, borderColor: '#E7E5E4', paddingVertical: 24, justifyContent: 'space-between' },
  scrollContent: { paddingHorizontal: 16 },
  brandContainer: { marginBottom: 24, paddingHorizontal: 8 },
  brandTitle: { fontSize: 18, fontWeight: '600', color: '#292524' },
  brandSub: { fontSize: 11, color: '#A8A29E', marginTop: 2 },
  navGroup: { gap: 4 },
  navItem: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8 },
  navItemActive: { backgroundColor: colors.cream },
  navText: { fontSize: 14, color: '#78716C' },
  navTextActive: { color: colors.cocoa[700], fontWeight: '600' },
  btnAction: { margin: 16, backgroundColor: colors.cocoa[700], paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  btnActionText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
});