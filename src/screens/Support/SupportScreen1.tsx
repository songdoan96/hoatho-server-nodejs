import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Loading from '../../components/Loading';
import Text from '../../components/Text';
import useAuthStore from '../../store/authStore';
import useToastStore from '../../store/toastStore';
import theme from '../../themes';
import CustomAxios from '../../utils/CustomAxios';
import {storage} from '../../utils/storage';
import {
  Play,
  ToggleOff,
  ToggleOffCircle,
  ToggleOn,
  ToggleOnCircle,
} from 'iconsax-react-native';
const SupportScreen = () => {
  const {user} = useAuthStore();
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const {showToast} = useToastStore();
  const [refreshing, setRefreshing] = React.useState(false);
  const [line, setLine] = useState<number>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    supportGetList();
    setRefreshing(false);
  }, []);
  const helpList = [
    {
      help: 'tocat',
      name: 'Tổ cắt',
    },
    {
      help: 'codien',
      name: 'Cơ điện',
    },
    {
      help: 'kythuat',
      name: 'Kỹ thuật',
    },
    {
      help: 'phulieu',
      name: 'Phụ liệu',
    },
  ];
  const lines = [];
  for (let index = 1; index <= 15; index++) {
    lines.push({
      id: index,
      title: 'Tổ ' + index,
    });
  }

  async function supportGetList() {
    setLoading(true);
    try {
      const {data} = await CustomAxios.get('/support/all');
      console.log('🚀 ~ supportGetList ~ data:', data);
      // setList(data.list);
    } catch (error) {}
    setLoading(false);
  }
  useEffect(() => {
    supportGetList();
  }, []);

  async function handleSupport(help: string) {
    // let done = list.includes(help);
    setLoading(true);
    try {
      const {data} = await CustomAxios.post('/support/add', {
        help,
        // done,
      });
      console.log('🚀 ~ handleSupport ~ data:', data);
      // setList(data.list);
      showToast('Yêu cầu thành công');
    } catch (error) {}
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text h5 style={styles.title}>
        Yêu cầu hỗ trợ
      </Text>
      <FlatList
        data={lines}
        numColumns={6}
        // columnWrapperStyle={{gap: 0}}
        contentContainerStyle={{
          // height: theme.SIZES.HEIGHT - theme.SIZES.WIDTH + 100,
          // justifyContent: 'center',
          // alignItems: 'center',
          // marginTop: 'auto',
          // gap: 10,
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setLine(item.id)}>
            {line === item.id ? (
              <ToggleOn color={'tomato'} size={50} variant={'Bold'} />
            ) : (
              <ToggleOff
                color={theme.COLORS.PRIMARY}
                size={50}
                variant={'Broken'}
              />
            )}

            <Text
              style={{
                paddingTop: 5,
                textTransform: 'capitalize',
                color: line === item.id ? 'tomato' : theme.COLORS.PRIMARY,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          contentContainerStyle={{
            // height: theme.SIZES.HEIGHT - theme.SIZES.WIDTH + 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
            gap: 20,
            padding: 10,
          }}
          columnWrapperStyle={{gap: 10}}
          numColumns={2}
          keyExtractor={item => item.help}
          data={helpList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.helpBtnWrap}
              onPress={() => handleSupport(item.help)}>
              <View
                style={[
                  styles.helpBtn,
                  list?.includes(item.help) && styles.helpBtnActive,
                ]}>
                <Text style={styles.helpText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SupportScreen;
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingTop: 10,
  },

  helpBtnWrap: {
    backgroundColor: '#C0C1C5',
    width: theme.SIZES.BUTTON_HELP_SIZE,
    height: theme.SIZES.BUTTON_HELP_SIZE,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 48,
    shadowColor: '#000',
    shadowOpacity: 1,
  },
  helpBtn: {
    backgroundColor: '#F1726E',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  helpBtnActive: {
    backgroundColor: '#03AF1B',
    borderColor: '#000',
  },
  helpText: {
    fontSize: theme.SIZES.BUTTON_HELP_SIZE * 0.15,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
