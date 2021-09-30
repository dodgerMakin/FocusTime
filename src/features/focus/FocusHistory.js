import React from 'react';
import { View, StyleSheet, Flatlist, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/size';
import { RoundedButton } from '../../components/roundedButton';

const HistoryItem = ({ item, index }) => {
  <Text style={styles.historyItem(item.status)}>{JSON.stringify(item)}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.6, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on.</Text>
            <Flatlist
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />

            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.lg,
  },
});
