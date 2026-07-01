import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, ThemeColors } from '../context/ThemeContext';
import { Character, Resources, HP } from '../types/character';
import { getHitDieType } from '../utils/dndRules';

interface RestModalProps {
  visible: boolean;
  character: Character;
  onClose: () => void;
  onShortRest: (hpGained: number, hitDiceUsed: number) => void;
  onLongRest: () => void;
}

export const RestModal: React.FC<RestModalProps> = ({
  visible,
  character,
  onClose,
  onShortRest,
  onLongRest,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [restType, setRestType] = useState<'choose' | 'short' | 'long'>('choose');
  const [dicesToSpend, setDicesToSpend] = useState(1);

  // 1. Fallbacks rígidos para proteger a renderização e cálculos
  const level = character?.level ?? 1;
  const hitDiceCurrent = character?.hitDice?.current;
  const hitDiceAvailable = hitDiceCurrent !== undefined ? hitDiceCurrent : level;

  const rawHitDie = character?.hitDice?.dieType ?? getHitDieType(character?.characterClass ?? 'fighter') ?? 'd8';
  const hitDieType = String(rawHitDie).toLowerCase();

  const rawCon = character?.baseStats?.con ?? 10;
  const conMod = Math.floor((rawCon - 10) / 2);

  const rollShortRest = () => {
    try {
      if (hitDiceAvailable <= 0) {
        Alert.alert('Sem Dados de Vida', 'Você não tem dados de vida disponíveis para gastar.');
        return;
      }

      const actual = Math.min(dicesToSpend, hitDiceAvailable);
      
      // Extração robusta do tamanho do dado (se for "1d8", pega só o "8")
      const dieStringParts = hitDieType.split('d');
      const dieSizeStr = dieStringParts[dieStringParts.length - 1]; 
      const dieSize = parseInt(dieSizeStr, 10) || 8; 

      let totalHeal = 0;
      const rolls: number[] = []; 

      for (let i = 0; i < actual; i++) {
        const roll = Math.floor(Math.random() * dieSize) + 1;
        rolls.push(roll);
        totalHeal += roll + conMod;
      }
      
      totalHeal = Math.max(0, totalHeal);
      
      // Blindagem do HP
      const hpMax = character?.hp?.max ?? 0;
      const hpCurrent = character?.hp?.current ?? 0;
      
      const maxHeal = hpMax - hpCurrent;
      const actualHeal = Math.min(totalHeal, Math.max(0, maxHeal));

      // Garante que todas as variáveis existam antes de chamar o Alert
      const rollStr = rolls.join(', ');
      const title = '💤 Descanso Curto';
      const message = `Rolou ${actual}x ${hitDieType}: [${rollStr}]\n+${conMod} CON cada\nCura total: +${actualHeal} HP`;

      console.log("Tentando exibir alerta:", message);

      // 1. Executa a cura e fecha a modal IMEDIATAMENTE (não depende mais do clique no OK)
      if (onShortRest) onShortRest(actualHeal, actual);
      setRestType('choose');
      onClose();

      // 2. Dispara o alerta logo em seguida com um pequeno atraso 
      // (Isso resolve o bug do React Native de alerta sobrepondo modal)
      setTimeout(() => {
        Alert.alert(title, message);
      }, 300);

    } catch (error) {
      console.error("Erro ao rolar descanso:", error);
      Alert.alert("Erro", "Falha ao calcular o descanso. Verifique os status do personagem.");
    }
  };

  const handleLongRest = () => {
// Executa direto para evitar o bug do Alerta sobre a Modal
    if (onLongRest) onLongRest(); 
    setRestType('choose');
    onClose(); 
    
    // Mostra o aviso depois que a modal já fechou
    setTimeout(() => {
      Alert.alert('🌙 Descanso Longo', 'HP, espaços de magia, dados de vida e recursos foram restaurados!');
    }, 300);
  };

  const resetAndClose = () => {
    setRestType('choose');
    setDicesToSpend(1);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={resetAndClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>💤 DESCANSO</Text>
            <TouchableOpacity onPress={resetAndClose}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {restType === 'choose' && (
            <View style={styles.chooseContainer}>
              <TouchableOpacity style={[styles.restBtn, styles.shortRestBtn]} onPress={() => setRestType('short')}>
                <Ionicons name="partly-sunny" size={28} color={colors.accentAmber} />
                <Text style={[styles.restBtnTitle, { color: colors.accentAmber }]}>Descanso Curto</Text>
                <Text style={styles.restBtnSub}>1+ hora. Gasta dados de vida para se curar.</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.restBtn, styles.longRestBtn]} onPress={() => setRestType('long')}>
                <Ionicons name="moon" size={28} color={colors.accentSky} />
                <Text style={[styles.restBtnTitle, { color: colors.accentSky }]}>Descanso Longo</Text>
                <Text style={styles.restBtnSub}>8 horas. Restaura HP, slots, dados e recursos.</Text>
              </TouchableOpacity>
            </View>
          )}

          {restType === 'short' && (
            <View style={styles.shortRestContainer}>
              <Text style={styles.label}>Dados de vida disponíveis:</Text>
              <Text style={styles.diceInfo}>
                {hitDiceAvailable}/{level} ({hitDieType})
              </Text>

              <Text style={[styles.label, { marginTop: 16 }]}>Quantos dados gastar?</Text>
              <View style={styles.diceSelector}>
                <TouchableOpacity
                  style={styles.diceBtn}
                  onPress={() => setDicesToSpend(Math.max(1, dicesToSpend - 1))}
                >
                  <Ionicons name="remove" size={20} color={colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.diceCount}>{dicesToSpend}</Text>
                <TouchableOpacity
                  style={styles.diceBtn}
                  onPress={() => setDicesToSpend(Math.min(hitDiceAvailable, dicesToSpend + 1))}
                >
                  <Ionicons name="add" size={20} color={colors.textMain} />
                </TouchableOpacity>
              </View>

              <Text style={styles.healPreview}>
                Cura estimada: ~{Math.round(
                  dicesToSpend * ((parseInt(hitDieType.replace('d', ''), 10) || 8) / 2 + 0.5 + conMod)
                )} HP
                {conMod !== 0 ? ` (${conMod > 0 ? '+' : ''}${conMod} CON por dado)` : ''}
              </Text>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setRestType('choose')}>
                  <Text style={styles.cancelBtnText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: colors.accentAmber }]}
                  onPress={rollShortRest}
                >
                  <Ionicons name="dice" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.confirmBtnText}>Rolar e Descansar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {restType === 'long' && (
            <View style={styles.longRestContainer}>
              <Text style={styles.longRestInfo}>Um descanso longo irá restaurar:</Text>
              <View style={styles.longRestList}>
                <Text style={styles.longRestItem}>❤️ HP ao máximo ({character?.hp?.max ?? 0})</Text>
                <Text style={styles.longRestItem}>🔮 Todos os espaços de magia</Text>
                <Text style={styles.longRestItem}>🎲 Todos os dados de vida ({level}/{level})</Text>
                <Text style={styles.longRestItem}>⚡ Todos os recursos de classe</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => setRestType('choose')}>
                  <Text style={styles.cancelBtnText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmBtn, { backgroundColor: colors.accentSky }]}
                  onPress={handleLongRest}
                >
                  <Ionicons name="moon" size={16} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.confirmBtnText}>Confirmar Descanso</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayBg,
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: colors.textMain,
    fontSize: 18,
    fontWeight: '900',
  },
  chooseContainer: {
    gap: 12,
  },
  restBtn: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  shortRestBtn: {
    backgroundColor: colors.accentAmberBg,
    borderColor: colors.accentAmber + '55',
  },
  longRestBtn: {
    backgroundColor: colors.accentSkyBg,
    borderColor: colors.accentSky + '55',
  },
  restBtnTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  restBtnSub: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
  shortRestContainer: {
    gap: 4,
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  diceInfo: {
    color: colors.textMain,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  diceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
  },
  diceBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceCount: {
    color: colors.textMain,
    fontSize: 28,
    fontWeight: '900',
    minWidth: 40,
    textAlign: 'center',
  },
  healPreview: {
    color: colors.accentEmerald,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  longRestContainer: {
    gap: 12,
  },
  longRestInfo: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '700',
  },
  longRestList: {
    gap: 8,
    paddingLeft: 4,
  },
  longRestItem: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
