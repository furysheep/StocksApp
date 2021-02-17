import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryCandlestick,
} from 'victory-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import {getCompany, getHistoricalPrices, getPeerGroups} from '../../Services';
import {RootState} from '../../Stores';
import {addToFavorites, removeFavorites} from '../../Stores/Favorites/actions';

type HomeStackParamList = {
  Home: undefined;
  Details: {symbol: string};
};

type DetailsScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Details'
>;
type DetailsScreenRouteProp = RouteProp<HomeStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({route, navigation}: Props) {
  const [company, setCompany] = React.useState('');
  const [data, setData] = React.useState([]);
  const [peers, setPeers] = React.useState([]);
  const {symbol} = route.params;
  const symbols = useSelector((state: RootState) => state.favorites.symbols);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async function getData() {
      const companyResult = await getCompany(symbol);
      if (companyResult) {
        setCompany(companyResult.companyName);
      }
      const result = await getHistoricalPrices(symbol);
      if (result) {
        setData(result);
      }
      const symbolPeers = await getPeerGroups(symbol);
      if (symbolPeers) {
        setPeers(symbolPeers);
      }
    })();
  }, []);

  const renderPeer = ({item}: ListRenderItemInfo<string>) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.push('Details', {symbol: item});
      }}>
      <Text style={styles.peer}>{item}</Text>
    </TouchableOpacity>
  );

  const markFavorites = () => {
    if (!symbols.includes(symbol)) {
      dispatch(addToFavorites(symbol));
    } else {
      dispatch(removeFavorites(symbol));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', padding: 20}}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={styles.company}>{company}</Text>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={markFavorites}>
          <Ionicons
            name={symbols.includes(symbol) ? 'star' : 'star-outline'}
            size={20}
            color="tomato"
          />
        </TouchableOpacity>
      </View>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{x: 25}}
        scale={{x: 'time'}}>
        {data.length > 0 && (
          <VictoryAxis
            tickValues={data.map((d) => moment(d.date).format('MM/DD'))}
            tickCount={4}
          />
        )}
        <VictoryAxis dependentAxis />
        <VictoryCandlestick
          candleColors={{positive: '#5f5c5b', negative: '#c43a31'}}
          data={data}
          open={(d) => d.fOpen}
          close={(d) => d.fClose}
          high={(d) => d.fHigh}
          low={(d) => d.fLow}
        />
      </VictoryChart>
      <View style={{padding: 20, flex: 1}}>
        <Text style={styles.title}>Peer Groups</Text>
        <FlatList
          contentContainerStyle={{flex: 1, padding: 10}}
          data={peers}
          renderItem={renderPeer}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  item: {
    paddingBottom: 5,
  },
  peer: {
    color: 'tomato',
  },
});
