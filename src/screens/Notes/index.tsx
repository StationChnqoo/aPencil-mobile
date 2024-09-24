import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RootStacksProp} from '..';
import FilterModal from './components/FilterModal';
import SearchBar from './components/SearchBar';

interface MyProps {
  navigation?: RootStacksProp;
}

const Notes: React.FC<MyProps> = props => {
  const [keyword, setKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState(false);
  const [filters, setFilters] = useState([]);
  const {navigation} = props;
  const [isShowFilterModal, setIsShowFilterModal] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <View
        style={{height: useSafeAreaInsets().top, backgroundColor: 'white'}}
      />
      <SearchBar
        onFilterPress={() => {
          setFilterStatus(!filterStatus);
          // setIsShowFilterModal(true);
          navigation.navigate('NotesFilter');
        }}
        onSearchPress={() => {}}
        filters={filters}
      />
      <FilterModal
        show={isShowFilterModal}
        onClose={() => {
          setIsShowFilterModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Notes;
