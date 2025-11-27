import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
  index: number;
  activeIndex: number;
}

export const StatusStep: React.FC<Props> = ({ label, index, activeIndex }) => {
  const isDone = index < activeIndex;
  const isActive = index === activeIndex;

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.indicator,
          isDone && styles.indicatorDone,
          isActive && styles.indicatorActive
        ]}
      >
        {isDone ? <Text style={styles.check}>✓</Text> : <Text style={styles.index}>{index + 1}</Text>}
      </View>
      <Text style={[styles.label, (isDone || isActive) && styles.labelActive]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  indicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicatorDone: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E'
  },
  indicatorActive: {
    borderColor: '#2563EB'
  },
  check: {
    fontWeight: '700',
    color: '#15803D'
  },
  index: {
    color: '#6B7280',
    fontWeight: '600'
  },
  label: {
    fontSize: 16,
    color: '#6B7280'
  },
  labelActive: {
    color: '#111827',
    fontWeight: '600'
  }
});
