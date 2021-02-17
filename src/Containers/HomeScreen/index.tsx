import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  TextInput,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getMostActiveStocks, getSearchKeywords} from '../../Services';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

export type StockData = {
  symbol: string;
  companyName: string;
  latestPrice: number;
};

export type SearchResult = {
  symbol: string;
};

type HomeStackParamList = {
  Home: undefined;
  Details: {symbol: string};
};

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Separator = () => <View style={styles.separator} />;

export default function HomeScreen({navigation}: Props) {
  const [searchingInProgress, setSearchingInProgress] = React.useState(false);
  const [keyword, setKeyword] = React.useState('');
  const [data, setData] = React.useState(Array<StockData>());
  const [searchResults, setSearchResults] = React.useState(
    Array<SearchResult>(),
  );
  React.useEffect(() => {
    (async function getData() {
      const result = await getMostActiveStocks();
      if (result) {
        setData(result.map((s: any) => s as StockData));
      }
    })();
  }, []);
  const renderItem = ({item}: ListRenderItemInfo<StockData>) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Details', {symbol: item.symbol});
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.symbol}</Text>
        <Text style={styles.company}>{item.companyName}</Text>
      </View>
      <Text style={styles.price}>{item.latestPrice}</Text>
    </TouchableOpacity>
  );

  const renderSearchItem = ({item}: ListRenderItemInfo<SearchResult>) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Details', {symbol: item.symbol});
      }}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{item.symbol}</Text>
      </View>
    </TouchableOpacity>
  );

  const onChangeKeyword = async (text: string) => {
    setKeyword(text);
    if (text.length == 0) {
      setSearchResults([]);
      return;
    }
    setSearchingInProgress(true);
    const results = await getSearchKeywords(text);
    setSearchingInProgress(false);
    if (results) {
      setSearchResults(results);
    }
  };

  const EmptyResultMessage = () => {
    return (
      !searchingInProgress && <Text style={styles.noResult}>No Result</Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeKeyword}
        placeholder="Search symbol..."
        placeholderTextColor="#ccc"
        value={keyword}
        returnKeyType="search"
        clearButtonMode="always"
        autoCapitalize="characters"
        autoCorrect={false}
      />
      {keyword.length > 0 ? (
        <KeyboardAwareFlatList
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.symbol}
          ItemSeparatorComponent={() => <Separator />}
          ListEmptyComponent={EmptyResultMessage}
          extraScrollHeight={-80}
        />
      ) : (
        <KeyboardAwareFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.symbol}
          ItemSeparatorComponent={() => <Separator />}
          extraScrollHeight={-80}
        />
      )}
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
  company: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#eee',
    paddingLeft: 5,
    height: 40,
    margin: 20,
  },
  noResult: {
    paddingLeft: 20,
  },
});
