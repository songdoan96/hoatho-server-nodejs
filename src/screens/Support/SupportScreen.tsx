import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Text from '../../components/Text';
import {ToggleOff, ToggleOn} from 'iconsax-react-native';
import theme from '../../themes';
import Button from '../../components/Button';
import useToastStore from '../../store/toastStore';
import CustomAxios from '../../utils/CustomAxios';
import useAuthStore from '../../store/authStore';

const SupportScreen = () => {
  const {user} = useAuthStore();
  const [list, setList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const {showToast} = useToastStore();
  const [refreshing, setRefreshing] = useState(false);
  const [line, setLine] = useState<number>();
  const [group, setGroup] = useState<number>();
  const [help, setHelp] = useState<number>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // supportGetList();
    setLine(null);
    setGroup(null);
    setRefreshing(false);
  }, []);

  const lines = [];
  for (let index = 1; index <= 15; index++) {
    lines.push({
      id: index,
      title: 'Tổ ' + index,
    });
  }
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
    // supportGetList();
  }, []);

  async function handleSupport(help: string) {
    // let done = list.includes(help);

    setLoading(true);
    try {
      const {data} = await CustomAxios.post('/support/add', {
        help,
        line,
        user_id: user._id,
      });
      console.log('🚀 ~ handleSupport ~ data:', data);
      // setList(data.list);
      showToast('Yêu cầu thành công');
    } catch (error) {}
    setLoading(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View
        style={{
          paddingVertical: 10,
          height: '10%',
          justifyContent: 'center',
        }}>
        <Text h4 textTransform="uppercase" center>
          Yêu cầu hỗ trợ
        </Text>
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: 10,
          height: '40%',
        }}>
        {lines.map(({title, id}) => (
          <TouchableOpacity
            key={id}
            onPress={() => setLine(id)}
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {line === id ? (
              <ToggleOn color={'tomato'} size={50} variant={'Bold'} />
            ) : (
              <ToggleOff
                color={theme.COLORS.PRIMARY}
                size={50}
                variant={'Broken'}
              />
            )}

            <Text>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          height: '50%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '30%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: theme.SIZES.BUTTON_HELP_SIZE * 0.75,
              height: theme.SIZES.BUTTON_HELP_SIZE * 0.75,
              backgroundColor:
                group === 1 ? theme.COLORS.PRIMARY : theme.COLORS.SECONDARY,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setGroup(1)}>
            <Text h6 color="#fff" textTransform="uppercase">
              Cụm 1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: theme.SIZES.BUTTON_HELP_SIZE * 0.75,
              height: theme.SIZES.BUTTON_HELP_SIZE * 0.75,
              backgroundColor:
                group === 2 ? theme.COLORS.PRIMARY : theme.COLORS.SECONDARY,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setGroup(2)}>
            <Text h6 color="#fff" textTransform="uppercase">
              Cụm 2
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '70%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            gap: 10,
          }}>
          {helpList.map(({help, name}) => (
            <TouchableOpacity
              key={help}
              activeOpacity={0.6}
              style={styles.helpBtnWrap}
              onPress={() => handleSupport(help)}>
              <View
                style={[
                  styles.helpBtn,
                  list?.includes(help) && styles.helpBtnActive,
                ]}>
                <Text style={styles.helpText}>{name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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
