import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from '../../Stores';

type FavoritesStackParamList = {
  Favorites: undefined;
  Details: {symbol: string};
};

type FavoritesScreenNavigationProp = StackNavigationProp<
  FavoritesStackParamList,
  'Favorites'
>;

type Props = {
  navigation: FavoritesScreenNavigationProp;
};

const Separator = () => <View style={styles.separator} />;

export default function FavoritesScreen({navigation}: Props) {
  const symbols = useSelector((state: RootState) => state.favorites.symbols);

  const renderItem = ({item}: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Details', {symbol: item});
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={symbols}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <Separator />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});
